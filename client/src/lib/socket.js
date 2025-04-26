import { io } from "socket.io-client";

const socket = io(`${process.env.NEXT_PUBLIC_URL}`, {
  withCredentials: true,
  autoConnect: true,
  reconnectionAttempts: Infinity,
});

export default socket;