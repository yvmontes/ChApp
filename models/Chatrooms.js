const orm = require("../config/orm");

let Chatrooms = {
  chatRooms: [],
  Chatroom: function(name) {
    this.name = name;
    this.addMessage = (name, message, username) => {
      orm.AddChat(name, message, username);
    };
  },
  newChatroom: name => {
    orm.newTable(name);
    Chatrooms[name] = new Chatrooms.Chatroom(name);
    Chatrooms.populateArray();
  },
  populateArray: async callback => {
    let MySqlchatRooms = await orm.selectChatrooms();
    for (i = 0; i < MySqlchatRooms.length; i++) {
      Chatrooms.chatRooms.push(MySqlchatRooms[i].chatRoomName);
    }
    console.log(Chatrooms.chatRooms);
    callback();
  },
  initializeChatRooms: () => {
    for (i = 0; i < Chatrooms.chatRooms.length; i++) {
      let name = Chatrooms.chatRooms[i];
      Chatrooms[name] = new Chatrooms.Chatroom(name);
    }
  },
  getMessages: async table => {
    let MySqlMessages = await orm.SelectAll(table);
    return MySqlMessages;
  }
};

module.exports = Chatrooms;
