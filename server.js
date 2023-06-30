const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http").createServer(app);

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.sendFile(__dirname + "public/index.html"));

const IO = require("socket.io")(http);

IO.on("connection", (socket) => {
  console.log("Connected!", socket.id);
  socket.on("user-joined", (username) =>
    socket.broadcast.emit("user-joined", username)
  );
  socket.on("message", (msg) => socket.broadcast.emit("message", msg));
});

http.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
