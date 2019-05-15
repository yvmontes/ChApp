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

// updates the UI based on the language selected.
var activeLink;
function changeUsersDiv(active) {
  console.log(active);
  if (active !== undefined) {
    toggleDisplay();
    activeLanguage = active;
    translateButtonClicked();
  }

  switch (active) {
    case "users":
      console.log(activeL);
      //document.body.style.background="#1c3226";
      document.getElementById("users-div").innerHTML =
        "currently displaying users";
      break;
    case "rooms":
      //document.body.style.background="#a23b00";
      document.getElementById("users-div").innerHTML =
        "Currently displaying rooms";
    default:
      break;
  }
}
