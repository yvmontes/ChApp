const connection = require("../connections/mySql");

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

  AddChat: (table, message, username) => {
    connection.query(
      "INSERT INTO " +
        table +
        " (username, chat, chatTime) VALUES ('" +
        username +
        "', '" +
        message +
        "', UTC_TIMESTAMP());"
    );
  },

  newTable: table => {
    connection.query(
      "CREATE TABLE " +
        table +
        " (username varchar(20) NOT NULL, chat varchar(255) NOT NULL, chatTime datetime NOT NULL PRIMARY KEY);"
    );
    connection.query(
      "INSERT INTO chatrooms (chatRoomName) VALUES ('" + table + "')"
    );
  },

  removeTable: table => {
    connection.query("DELETE FROM CHATROOMS WHERE chatRoomName = " + table);
    connection.query("drop table " + table);
  },

  selectChatrooms: () => {
    return new Promise(resolve => {
      connection.query("select chatRoomName from chatrooms", function(
        _req,
        res
      ) {
        resolve(res);
      });
    });
  }
};

module.exports = orm;
