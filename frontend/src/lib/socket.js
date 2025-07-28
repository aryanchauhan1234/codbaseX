// src/lib/socket.js
import { io } from "socket.io-client";

export const socket = io("http://localhost:5001", {
  autoConnect: false, // you control when to connect
});
