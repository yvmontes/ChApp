module.exports = function(io) {
  Chatrooms = require("../models/Chatrooms");
  io.on("connection", function(socket) {
    console.log("newConnection");

    let url = socket.handshake.headers.referer.split("/");
    console.log(url);
    let roomName = url[4];

    socket.on("createRoom", function(msg) {
      console.log(msg.roomName);
      console.log(msg.permanant);
      console.log(msg.private);
    });

    console.log(roomName, "roomName");
    // if (/^[a-zA-Z0-9_]+$/.test(roomName)) {
    //   if (Chatrooms.chatRooms.includes(roomName)) {
    console.log("ifstatement");
    socket.join(roomName);

    socket.on("chatMessage", function(incomingMessage) {
      console.log("message");
      let outgoingMessage = {
        username: incomingMessage.username,
        message: incomingMessage.message
      };
      console.log(Chatrooms);
      Chatrooms[roomName].addMessage(
        incomingMessage.message,
        incomingMessage.username
      );
      io.to(roomName).emit("chatMessage", outgoingMessage);
    });
    //   }
    // }
  });
};
