let mysql = require("mysql");

connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "webuser",
  password: "password",
  database: "chapp_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;
