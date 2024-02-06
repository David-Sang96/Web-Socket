const express = require("express");
const socket = require("socket.io");

const app = express();

app.use(express.static("public"));

const server = app.listen(2000, () => {
  console.log("sever is listening on 2000");
});

app.get("/", (req, res) => {
  req.send("index.html");
});

const io = socket(server);
io.on("connection", (socket) => {
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });
  socket.on("typing", (name) => {
    socket.broadcast.emit("typing", name);
  });
});
