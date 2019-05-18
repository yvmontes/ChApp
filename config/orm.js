const connection = require("../connections/mySql");

let orm = {
  SelectAll: table => {
    return new Promise(resolve => {
      connection.query(
        "select * from " + table + " order by chatTime DESC limit 100",
        function(err, res) {
          if (err) {
            throw err;
          }
          resolve(res);
        }
      );
    });
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

  newTable: (table, permenant) => {
    connection.query(
      "CREATE TABLE " +
        table +
        " (id int AUTO_INCREMENT PRIMARY KEY, username varchar(20) NOT NULL, chat varchar(255) NOT NULL, chatTime datetime NOT NULL);"
    );
    connection.query(
      "INSERT INTO chatrooms (chatRoomName, permanant) VALUES ('" +
        table +
        "'," +
        permenant +
        ")"
    );
  },

  removeTable: table => {
    connection.query(
      "DELETE FROM CHATROOMS WHERE chatRoomName = '" + table + "'"
    );
    connection.query("drop table " + table);
    console.log("done removing");
  },

  selectChatrooms: () => {
    return new Promise(resolve => {
      connection.query("select * from chatrooms", function(_req, res) {
        resolve(res);
      });
    });
  },
  isPermanent: room => {
    return new Promise(resolve => {
      connection.query(
        "select permanant from chatrooms where chatRoomName = '" + room + "'",
        function(req, res) {
          resolve(res);
        }
      );
    });
  }
};

module.exports = orm;
