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
import { upload } from "../middleware/uploadFileMiddleware.js";

const app = Router();

app.use(verifyLogin);
app.post("/makeGroup", createGroup);
app.delete("/deleteGroup/:id", deleteGroup);
app.put("/addMember", addMember);
app.post("/removeMember", removeMember);
app.delete("/leaveGroup/:id", leaveGroup);
app.get("/myGroups", myGroups);
app.get("/myMessages/:id", myMessages);
app.post("/sendMessage/:id",upload.array("file") ,sendMessage);
export default app;
