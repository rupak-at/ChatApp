import { Router } from "express";
import { acceptRequest, rejectRequest, sendRequest } from "../controller/friendRequestController.js";
import verifyLogin from "../middleware/authMiddleware.js";

const app = Router()


app.post('/sendRequest', verifyLogin,sendRequest)
app.post('/acceptRequest', verifyLogin,acceptRequest)
app.post('/rejectRequest', verifyLogin,rejectRequest)

export default app