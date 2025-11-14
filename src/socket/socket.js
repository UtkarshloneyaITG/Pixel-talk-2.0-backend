const {
  drawController,
  startController,
  clearController,
} = require("../controller/draw.controller");
const {
  messageController,
  deleteMessage,
} = require("../controller/message.controller");
const MSG_ = require("../model/chat.model");

const handleSocketConnection = async (socket, io) => {
  console.log("A user connected:", socket.id);
  const chatData = await MSG_.find();
  chatData.forEach((msg) => {
    io.emit("chat-message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
  socket.on("clear", () => {
    clearController(socket, io);
  });

  socket.on("draw", (data) => {
    drawController(socket, io, data);
  });

  socket.on("start", (data) => {
    startController(socket, io, data);
  });
  socket.on("chat-message", (msg) => {
    messageController(socket, io, msg);
  });
  socket.on("delete-message", (ID) => {
    deleteMessage(socket, io, ID);
  });
};

module.exports = handleSocketConnection;
