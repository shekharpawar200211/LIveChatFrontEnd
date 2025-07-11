import { io } from "socket.io-client";

function createSocket(userId) {
  const socket = io("http://localhost:9899", {
    query: {
      userId: userId,
    },
  });

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  return socket;
}
export default createSocket
