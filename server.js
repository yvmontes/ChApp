require("dotenv").config();
let mysql = require("mysql")
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const exphbs = require("express-handlebars");

connection = mysql.createConnection(
  {
  host: 'localhost',
  port: 3306,
  user: "webuser",
  password: "password",
  database: "chapp_db"
  }
);

connection.connect(function(err) {
  if (err) {
      console.error("error connecting: " + err.stack);
      return;
  }
  console.log("connected as id " + connection.threadId);
});


app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

PORT = process.env.PORT;

app.get("/", function(req, res){
  res.sendFile(__dirname + "/main.html");
})

app.get("/:room", function(req, res){
  res.sendFile(__dirname + "/chatroom.html");
})

io.on("connection", function(socket){
  console.log("newConnection");

  let url = socket.handshake.headers.referer.split("/")
  let roomName = url[url.length -1]
  socket.join(roomName);

  connection.query("select * from generalChat order by chatTime DESC limit 100", function(err, res){
    if (err) throw err;
    io.to(`${socket.id}`).emit('initialMessages', res);
  })

  socket.on('chatMessage', function (incomingMessage) {

    connection.query("INSERT INTO generalChat (username, chat, chatTime) VALUES (?, ?, UTC_TIMESTAMP())", [incomingMessage.username, incomingMessage.message])

    let outgoingMessage = {
      username: incomingMessage.username,
      message: incomingMessage.message
    }

    io.to(roomName).emit('chatMessage', outgoingMessage);
  });
});

http.listen(PORT, function(){
  console.log("listening on port: ", PORT);
})