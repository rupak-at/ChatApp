import { Router } from "express";
import {
  addMember,
  createGroup,
  deleteGroup,
  leaveGroup,
  myGroups,
  myMessages,
  removeMember,
  sendMessage,
} from "../controller/groupController.js";
import verifyLogin from "../middleware/authMiddleware.js";

const app = Router();

app.use(verifyLogin);
app.post("/makeGroup", createGroup);
app.post("/deleteGroup", deleteGroup);
app.put("/addMember", addMember);
app.put("/removeMember", removeMember);
app.delete("/leaveGroup/:id", leaveGroup);
app.get("/myGroups", myGroups);
app.get("/myMessages/:id", myMessages);
app.post("/sendMessage/:id", sendMessage);
export default app;
