const orm = require("../config/orm");

let Chatroom = function(name) {
  this.name = name;

  addMessage: message => {
    orm.AddChat(this.name, message);
  };
};

module.exports = Chatroom;
