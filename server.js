require("dotenv").config();

const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

PORT = process.env.PORT;

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
})

app.get("/room1", function(req, res){
  res.sendFile(__dirname + "/index.html");
})

//connsection from specific room;
// const main = io.of('/main');
// main.on('connection', function(socket){
//   console.log('someone connected');
//   console.log(socket.adapter.nsp.name);
//   socket.on("chat message", function(msg){
//     console.log(msg)
//     //main.emit("chat message", msg);
//     socket.to("/main").emit('chat message', msg);
//   })
// });
// main.emit('hi', 'everyone!');


// io.on("connection", function(socket){
//   console.log(socket.client.server);

//   socket.on("chat message", function(msg){
//     console.log(msg);
//     socket.to(socket.nsp.name).emit('chat message', msg);
//   })

//   // socket.on("chat message", function(msg){
//   //   console.log("message: " + msg);
//   //   io.emit("chat message", msg)
//   // })

//   socket.on("disconnect", function(){
//     console.log("user disconnected");
//   })
// })

io.on("connection", function(socket){
  let room_name = socket.handshake.headers.referer

  socket.join(room_name);
  socket.on('chat message', function (msg) {
    console.log(msg);
    io.to(room_name).emit('chat message', msg);
 });
})

http.listen(PORT, function(){
  console.log("listening on port: ", PORT);
})