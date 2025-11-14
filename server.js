const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const handleSocketConnection = require("./src/socket/socket");
const cors = require("cors");
const connectdb = require("./src/config/db");
connectdb();
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 40001;
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

app.use(cors({ origin: "*" }));

io.on("connection", (socket) => {
  console.log("🟢 frontend connected:", socket.id);
  handleSocketConnection(socket, io);
  socket.on("disconnect", () => console.log("🔴 Disconnected:", socket.id));
});

server.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
