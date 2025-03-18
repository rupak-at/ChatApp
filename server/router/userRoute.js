import { Router } from "express";
import {
  deleteUser,
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
app.post("/logout", verifyLogin, logoutUser);
app.post("/updateAvatar", verifyLogin, upload.single("avatar"), updateAvatar);
app.post("/updateUserName", verifyLogin, updateUserName);
app.delete("/deleteUser", verifyLogin, deleteUser);
app.get("/getMyProfile", verifyLogin, getMyProfile);
app.post("/updatePassword", verifyLogin, updatePassword);

export default app;
