import { Router } from "express";
import verifyLogin from "../middleware/authMiddleware.js";
import {
  disconnectFriend,
  getMyMessages,
  sendMessage,
} from "../controller/individualController.js";
import { upload } from "../middleware/uploadFileMiddleware.js";

const app = Router();

app.use(verifyLogin);

app.get("/myMessages/:chatId", getMyMessages);
app.delete("/remove/:chatId", disconnectFriend);
app.post("/message/:chatId",upload.array("file"), sendMessage);

export default app;
