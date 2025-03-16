import { Router } from "express";
import verifyLogin from "../middleware/authMiddleware.js";
import { disconnectFriend, getMyMessages } from "../controller/individualController.js";

const app = Router()

app.use(verifyLogin)

app.get('/myMessages/:chatId', getMyMessages)
app.get('/disconnect/:chatId', disconnectFriend)

export default app