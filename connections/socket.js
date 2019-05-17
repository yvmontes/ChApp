module.exports = function(io) {
    Chatrooms = require("../models/Chatrooms");
    io.on("connection", function(socket) {
        console.log("newConnection");

        let url = socket.handshake.headers.referer.split("/");
        let roomName = url[4];

        socket.on("createRoom", function(msg) {
            Chatrooms.newChatroom(msg.roomName);
        });

        // if (/^[a-zA-Z0-9_]+$/.test(roomName)) {
        //   if (Chatrooms.chatRooms.includes(roomName)) {

        socket.join(roomName);

        socket.on("chatMessage", function(incomingMessage) {
            console.log("message");
            let outgoingMessage = {
                username: incomingMessage.username,
                message: incomingMessage.message
            };
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