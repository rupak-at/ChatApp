import { Router } from "express";
import {
  deleteUser,
  getAllFriendsWithChatId,
  getAllGroupWithChatdId,
  getAllUsers,
  getMyProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateAvatar,
  updatePassword,
  updateUserName,
} from "../controller/userController.js";
import verifyLogin from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadFileMiddleware.js";

const app = Router();

app.post("/register", upload.single("avatar"), registerUser);
app.post("/login", loginUser);
app.use(verifyLogin);
app.post("/logout", logoutUser);
app.post("/updateAvatar", upload.single("avatar"), updateAvatar);
app.post("/updateUserName", updateUserName);
app.delete("/deleteUser", deleteUser);
app.get("/getMyProfile", getMyProfile);
app.post("/updatePassword", updatePassword);
app.get("/friend", getAllFriendsWithChatId);
app.get("/group", getAllGroupWithChatdId)
app.get("/allusers", getAllUsers);

export default app;
