import { User } from "../model/userModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const options = {
  httpOnly: true,
  secure: true,
  sameSite: "Strict",
};

const registerUser = async (req, res) => {
  try {
    const avatarPath = req.file?.path || null;

    const { username, email, password } = req.body;

    //check for empty value
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All Field Are Required" });
    }

    const existedUser = await User.findOne({ email });
    //check for existing email
    if (existedUser) {
      return res.status(409).json({ message: "User Already Existed" });
    }

    const existedUserName = await User.findOne({ username });
    //check for unique username
    if (existedUserName) {
      return res.status(409).json({ message: "UserName Already Taken" });
    }

    //upload image in clodinary if user has upload an image
    let avatarURL;

    if (avatarPath) {
      const { optimizeUrl } = await uploadOnCloudinary(avatarPath);
      avatarURL = optimizeUrl;
    } else {
      //if not a deafult image
      avatarURL =
        "https://res.cloudinary.com/duwi6qu6b/image/upload/v1741515762/default-profile_nekw1l.jpg";
    }

    const user = await User.create({
      username,
      email,
      password,
      avatar: avatarURL,
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    return res
      .status(201)
      .json({ message: "Register User", user: createdUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Failure" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User Not Registered" });
    }
    //validate password
    const validPassword = await user.comparePassword(password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid Credrentials" });
    }

    const refreshToken = await user.generateRefreshToken();
    const accessToken = await user.generateAccessToekn();

    //saving refreshToken in the DB
    user.refreshToken = refreshToken;

    await user.save();
    //sending into the cookie
    res.cookie("refreshToken", refreshToken, options);
    res.cookie("accessToken", accessToken, options);

    res.status(200).json({
      message: "Login Successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Failure" });
  }
};

const logoutUser = async (req, res) => {
  try {
    //getting is from middleaware and updating refreshToken to null for logout
    await User.findByIdAndUpdate(
      req.userID,
      { $set: { refreshToken: null } },
      { new: true }
    );
    //removing the cookie
    res.clearCookie("refreshToken", options);
    res.clearCookie("accessToken", options);
    res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Failure" });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.userID);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const avatarPath = req.file?.path 

    if (avatarPath) {
      const { optimizeUrl } = await uploadOnCloudinary(avatarPath);
      user.avatar = optimizeUrl;
      await user.save();
      return res.status(200).json({ message: "Avatar Updated Successfully" });
    }

    return res.status(404).json({ message: "Avatar Not Found" });

  }catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Failure" });
  }    
};

const updateUserName = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findById(req.userID);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const existedUserName = await User.findOne({ username });

    if (existedUserName) {
      return res.status(409).json({ message: "UserName Already Taken" });
    }

    user.username = username;
    await user.save();

    return res.status(200).json({ message: "Username Updated Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Failure" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.userID);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    await user.deleteOne();
    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Failure" });
  }
};

export { registerUser, loginUser, logoutUser , updateAvatar, updateUserName, deleteUser};
