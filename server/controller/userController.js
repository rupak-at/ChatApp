import { User } from "../model/userModel.js";

const options = {
  httpOnly: true,
  secure: true,
  sameSite: "Strict",
};
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //check for empty value
    if (!username || !email || !password) {
      return res.status(401).json({ message: "All Field Are Required" });
    }

    const existedUser = await User.findOne({ email });
    //check for existing email
    if (existedUser) {
      return res.status(301).json({ message: "User Already Existed" });
    }

    const existedUserName = await User.findOne({ username });
    //check for unique username
    if (existedUserName) {
      return res.status(301).json({ message: "UserName Already Taken" });
    }

    const user = await User.create({
      username,
      email,
      password,
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
      return res.status(402).json({ message: "User Not Registered" });
    }
    //validate password
    const validPassword = await user.comparePassword(password);

    if (!validPassword) {
      return res.status(402).json({ message: "Invalid Credrentials" });
    }

    const refreshToken = await user.generateRefreshToken();
    const accessToken = await user.generateAccessToekn();

    //saving refreshToken in the DB
    user.refreshToken = refreshToken;

    await user.save();
    //sending into the cookie
    res.cookie("refreshToken", refreshToken, options);
    res.cookie("accessToken", accessToken, options);

    res.status(200).json({ message: "Login Successfully" });
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
export { registerUser, loginUser, logoutUser };
