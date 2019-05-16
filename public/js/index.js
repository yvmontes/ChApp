$(function() {
  var socket = io();
  $("form").submit(function(e) {
    e.preventDefault(); // prevents page reloading
    socket.emit("chat message", $("#m").val());
    $("#m").val("");
    return false;
  });
  socket.on("chat message", function(msg) {
    console.log(msg);
    $("#messages").append($("<li>").text(msg));
  });
});

// changes the users-div to users or rooms

// var activeLink;
// function changeUsersDiv (active){
//     console.log(active);
//     if (active !== undefined) {
//         toggleDisplay();
//         activeLanguage = active;  
//         translateButtonClicked();
//     }


// switch (active) {
            
//   case 'users':
//       console.log(activeLanguage);
//       document.getElementById("users-div").innerHTML = "Currently showing users";
//       break;
//   case 'rooms':
//       document.getElementById("users-div").innerHTML = "Currently showing rooms";
//   default:
//       break;
// }
// }

var usersBox = document.getElementById("usersDiv");
var usersContent = document.getElementById("users");
var roomContent = document.getElementById("rooms");

users.onclick = function(){
  document.getElementById("users-div").innerHTML = "<p><strong>Users</strong> (25)<br/>Currently showing users";
}

rooms.onclick = function(){
  document.getElementById("users-div").innerHTML = "Currently showing rooms";
}