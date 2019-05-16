require("dotenv").config();

const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

PORT = process.env.PORT;

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/main.html");
});

app.get("/:room", function(req, res) {
  res.sendFile(__dirname + "/chatroom.html");
});

io.on("connection", function(socket) {
  console.log("newConnection");

  let url = socket.handshake.headers.referer.split("/");
  let roomName = url[url.length - 1];
  socket.join(roomName);

  socket.on("chatMessage", function(incomingMessage) {
    let outgoingMessage = {
      username: incomingMessage.username,
      message: incomingMessage.message
    };

    io.to(roomName).emit("chatMessage", outgoingMessage);
  });
});

http.listen(PORT, function() {
  console.log("listening on port: ", PORT);
});
