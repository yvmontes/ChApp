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

// //Handlebars with route
// app.get("/", function(req, res) {

// res.render("index", );
//   });
// app.get("/dog", function(req, res) {
//   // Handlebars requires an object to be sent to the dog.handlebars file. Lucky for us, animals[0] is an object!

//   // 1. Send the dog object from the animals array to the dog.handlebars file.
//   //the "dog" part is the name of the dog.handlebars
//   res.render("index", animals[0]);<<<<<<the dog part here is the page.
// });

// app.get("/all-pets", function(req, res) {
//   // Handlebars requires an object to be sent to the index.handlebars file.

//   // 2. Send the animals to the index.handlebars file. Remember that animals is an array and not an object.
//   var data = {
//     animals: []
//   };
//   for (var i = 0; i < animals.length; i += 1) {
//     var currentAnimal = animals[i];
//     if (currentAnimal.pet) {
//       data.animals.push(currentAnimal);
//     }
//   }
//   //render
//   res.render("index", data);
// });




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

