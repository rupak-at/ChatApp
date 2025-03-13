import { Router } from "express";
import { addMember, createGroup, deleteGroup, removeMember } from "../controller/groupController.js";
import verifyLogin from "../middleware/authMiddleware.js";

const app = Router()

app.post('/makeGroup', verifyLogin, createGroup)
app.post('/deleteGroup', verifyLogin, deleteGroup)
app.post('/addMember', verifyLogin, addMember)
app.post('/removeMember', verifyLogin, removeMember)

export default app