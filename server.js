require("dotenv").config();
const app = require("express")();
const http = require("http").Server(app);
const exphbs = require("express-handlebars");
const io = require("socket.io")(http);
const Chatrooms = require("./models/Chatrooms");
require("./connections/socket")(io);

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

PORT = process.env.PORT;

app.get("/createRoom", function(req, res) {
  res.sendFile(__dirname + "/create.html");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/main.html");
});

app.get("/rooms/:room", function(req, res) {
  if (Chatrooms.chatRooms.includes(req.params.room)) {
    res.sendFile(__dirname + "/chatroom.html");
  } else {
    res.json("room not available");
  }
});

http.listen(PORT, function() {
  console.log("listening on port: ", PORT);
  //populate room array;
  Chatrooms.populateArray(function() {
    Chatrooms.initializeChatRooms();
  });
});
