import { io } from "socket.io-client";

const socket = io("http://localhost:4000", {
  withCredentials: true,
  autoConnect: true,
  reconnectionAttempts: Infinity,
});

export default socket;