import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controller/userController.js";
import verifyLogin from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadFileMiddleware.js"



const app = Router()

app.post('/register',upload.single('avatar'), registerUser);
app.post('/login', loginUser)
app.post('/logout',verifyLogin ,logoutUser)

export default app