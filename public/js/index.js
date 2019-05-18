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

<<<<<<< HEAD
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
=======
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
>>>>>>> a428bd50fe8872f0a77ba8900fd6c2c5b024e9c9

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

<<<<<<< HEAD
rooms.onclick = function(){
  document.getElementById("users-div").innerHTML = "Currently showing rooms";
}


// CODE FOR PREPENDING CHAT INTO COLUMN
window.onload=function(){
var form = document.getElementsByTagName("form")[0];
form.onsubmit = function(e){
    e.preventDefault();
    var messege = document.getElementsByName("messege")[0].value;
    var newDiv = document.createElement("div");
    newDiv.className = "message";
    newDiv.innerHTML = "<span style='color: red;'>Hawkgirl:</span>" + "<span>" + messege + "</span>";
    document.getElementById("chatwindow-div").prepend(newDiv);
}
=======
function goBack() {
    window.history.back();
>>>>>>> a428bd50fe8872f0a77ba8900fd6c2c5b024e9c9
}