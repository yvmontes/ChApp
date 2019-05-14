const connection = require("./mySql");
let orm = {
  SelectAll: (table, callback) => {
    connection.query(
      "select * from " + table + " order by chatTime DESC limit 100",
      function() {
        if (err) {
          throw err;
        }
        callback(result);
      }
    );
  },

  AddChat: table => {
    connection.query(
      "INSERT INTO " + table + "(username, chat, chatTime) VALUES ("
    );
  }
  // connection.query("select * from generalChat order by chatTime DESC limit 100", function(err, res){
  //     if (err) throw err;
  //     io.to(`${socket.id}`).emit('initialMessages', res);
  //   })

  //   connection.query("INSERT INTO generalChat (username, chat, chatTime) VALUES (?, ?, UTC_TIMESTAMP())", [incomingMessage.username, incomingMessage.message])
};

module.exports = orm;
