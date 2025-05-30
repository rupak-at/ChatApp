import e from "express";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./db/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoute from "./router/userRoute.js";
import singleChatRoute from "./router/singleChatRoute.js";
import groupChatRoute from "./router/groupRoute.js";
import friendRequest from "./router/friendRequestRoute.js";

const port = process.env.PORT;
const app = e();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

connectDB().then(() => {
  server.listen(port, () => {
    console.log("App Running on", port);
  });
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "DELETE", "PATCH", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(e.static("public"));
app.use(e.urlencoded({ extended: true }));
app.use(e.json());

app.use(userRoute);
app.use("/user", singleChatRoute);
app.use("/group", groupChatRoute);
app.use("/request", friendRequest);

// Socket.IO connection
global.onlineUser = {};
io.on("connection", (socket) => {
  // console.log("A user connected:", socket.id);

  socket.on("login", (userId) => {
    console.log("User logged in: ", userId);

    if (global.onlineUser[userId]) {
      global.onlineUser[userId] = socket.id;
    }
    global.onlineUser[userId] = socket.id;

    io.emit("user-online", userId);
  });

  socket.on("logout", (userId) => {
    console.log("User logged out: ", userId);
    io.emit("user-offline", userId);
    delete global.onlineUser[userId];
  });

  socket.on("user-typing", (data) => {
    io.to(data.chatId).emit("started-typing", data);
  });

  // Join a room based on chatId
  socket.on("join-chat", (chatId) => {
    socket.join(chatId);
    // console.log(`User ${socket.id} joined chat ${chatId}`);
  });

  // Leave a room when disconnected
  socket.on("disconnect", () => {
    // console.log("User disconnected:", socket.id);
    const userId = Object.keys(global.onlineUser).find(
      (key) => global.onlineUser[key] === socket.id
    );
    if (userId) {
      io.emit("user-offline", userId);
      delete global.onlineUser[userId];
    }
  });
});

// Make io accessible in your routes
app.set("io", io);
