// adds the messages when clicking submit

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

// submit message on enter

function process(e) {
  var code = e.keyCode ? e.keyCode : e.which;
  if (code == 13) {
    //Enter keycode
    alert("Sending your Message : " + document.getElementById("textbox").value);
  }
}

// submit message on enter usinf jquery
// $(function(){

//   $('input[name="butClickHere"]').click(function(){
//     alert('You clicked me...!');
//   });

//   //press enter on text area..
//  $('#textbox').keypress(function (e) {
//  var key = e.which;
//  if(key == 13)  // the enter key code
//   {
//     $('input[name = butClickHere]').click();
//     return false;
//   }
// });

// });

// changes the users-div to users or rooms

var usersBox = document.getElementById("usersDiv");
var usersContent = document.getElementById("users");
var roomContent = document.getElementById("rooms");

users.onclick = function() {
  document.getElementById("users-div").innerHTML =
    "<p><strong>Users</strong> (25)<br/>Currently showing users";
};;

rooms.onclick = function() {
  document.getElementById("users-div").innerHTML = "Currently showing rooms";
};;

// back button

function goBack() {
  window.history.back();
}
