const orm = require("../config/orm")

let chatroom = function(name){
    this.name = name;

    addMessage: function(message){
        orm.AddChat(name, message);
    }
}