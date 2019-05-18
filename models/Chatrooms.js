const orm = require("../config/orm");

let Chatrooms = {
  chatRooms: [],
  Chatroom: function(name) {
    this.name = name;
    this.users = 0;
    this.addMessage = (name, message, username) => {
      orm.AddChat(name, message, username);
    };
  },
  newChatroom: (name, permanent) => {
    orm.newTable(name, permanent);
    Chatrooms[name] = new Chatrooms.Chatroom(name);
    Chatrooms.populateArray();
  },
  populateArray: async callback => {
    let MySqlchatRooms = await orm.selectChatrooms();
    Chatrooms.chatRooms = [];
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
  },
  isPermanent: table => {
    return new Promise(async resolve => {
      let response = await orm.isPermanent(table);
      resolve(response);
    });
  },
  removeTable: table => {
    Chatrooms.chatRooms.splice(Chatrooms.chatRooms.indexOf(table), 1);
    orm.removeTable(table);
  }
};

module.exports = Chatrooms;
