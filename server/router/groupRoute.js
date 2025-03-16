import { Router } from "express";
import { addMember, createGroup, deleteGroup, leaveGroup, removeMember } from "../controller/groupController.js";
import verifyLogin from "../middleware/authMiddleware.js";

const app = Router()

app.post('/makeGroup', verifyLogin, createGroup)
app.post('/deleteGroup', verifyLogin, deleteGroup)
app.put('/addMember', verifyLogin, addMember)
app.put('/removeMember', verifyLogin, removeMember)
app.post('/leaveeGroup', verifyLogin, leaveGroup)

export default app