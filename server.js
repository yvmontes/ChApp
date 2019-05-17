require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").Server(app);
const exphbs = require("express-handlebars");
const io = require("socket.io")(http);
const Chatrooms = require("./models/Chatrooms");
const path = require("path");
require("./connections/socket")(io);

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
console.log(path.join(__dirname, "/public"));
app.use(express.static(path.join(__dirname, "/public")));

PORT = process.env.PORT;

app.get("/help", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/help.html"));
});

app.get("/createRoom", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/createroom.html"));
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/rooms/:room", function(req, res) {
  if (Chatrooms.chatRooms.includes(req.params.room)) {
    res.sendFile(path.join(__dirname, "/public/chatroom.html"));
  } else {
    res.sendFile(path.join(__dirname, "/public/createroom.html"));
  }
});

http.listen(PORT, function() {
  console.log("listening on port: ", PORT);
  Chatrooms.populateArray(function() {
    Chatrooms.initializeChatRooms();
  });
});
