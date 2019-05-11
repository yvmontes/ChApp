require("dotenv").config();

const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const exphbs = require("express-handlebars");

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

