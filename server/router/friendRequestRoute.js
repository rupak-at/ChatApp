import { Router } from "express";
import {
  acceptRequest,
  getAllRequest,
  rejectRequest,
  sendRequest,
} from "../controller/friendRequestController.js";
import verifyLogin from "../middleware/authMiddleware.js";

const app = Router();

app.use(verifyLogin);
app.post("/sendRequest/:id", sendRequest);
app.post("/acceptRequest/:id", acceptRequest);
app.post("/rejectRequest/:id", rejectRequest);
app.get("/allrequest", getAllRequest);

export default app;
