import { Router } from "express";
import {
  addMember,
  createGroup,
  deleteGroup,
  leaveGroup,
  myGroups,
  removeMember,
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

export default app;
