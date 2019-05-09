require("dotenv").config();

const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

PORT = process.env.PORT;

app.get("/", function(req, res){
  res.render("index");
})

io.on("connection", function(socket){
  console.log("an user connected");

  socket.on("chat message", function(msg){
    console.log("message: " + msg);
    io.emit("chat message", msg)
  })

  socket.on("disconnect", function(){
    console.log("user disconnected");
  })
})

http.listen(PORT, function(){
  console.log("listening on port: ", PORT);
})