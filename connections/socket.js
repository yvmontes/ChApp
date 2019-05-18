module.exports = function(io) {
  Chatrooms = require("../models/Chatrooms");
  io.on("connection", function(socket) {
    console.log("newConnection");

    let url = socket.handshake.headers.referer.split("/");
    let roomName = url[4];

    socket.on("createRoom", function(msg) {
      if (/^[a-zA-Z0-9_]+$/.test(msg.roomName)) {
        Chatrooms.newChatroom(msg.roomName, msg.permanent);
      }
    });

    // if (/^[a-zA-Z0-9_]+$/.test(roomName)) {
    //   if (Chatrooms.chatRooms.includes(roomName)) {
    if (Chatrooms.chatRooms.includes(roomName)) {
      socket.join(roomName);
      Chatrooms[roomName].users++;
      console.log(Chatrooms[roomName].users);
      (async () => {
        let msg = {
          messages: await Chatrooms.getMessages(roomName),
          rooms: Chatrooms.chatRooms
        };
        console.log(msg.rooms);
        io.to(roomName).emit("initialMessage", msg);
      })();
    }

    socket.on("chatMessage", function(incomingMessage) {
      console.log("message");
      let outgoingMessage = {
        username: incomingMessage.username,
        message: incomingMessage.message
      };
      Chatrooms[roomName].addMessage(
        roomName,
        incomingMessage.message,
        incomingMessage.username
      );
      io.to(roomName).emit("chatMessage", outgoingMessage);
    });
    //   }
    // }

    socket.on("disconnect", function() {
      if (Chatrooms.chatRooms.includes(roomName)) {
        Chatrooms[roomName].users--;
        if (Chatrooms[roomName].users <= 0) {
          (async () => {
            let response = await Chatrooms.isPermanent(roomName);
            if (response.permanent === 0) {
              Chatrooms.removeTable(roomName);
            }
          })();
        }
      }
    });
  });
};
