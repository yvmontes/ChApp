CREATE DATABASE messages_db;
USE messages_db;

CREATE TABLE chatrooms (
    id int AUTO_INCREMENT PRIMARY KEY,
    chatRoomName varchar (50) NOT NULL,
)

CREATE TABLE generalChat (
    username varchar(20) NOT  NULL,
    chat varchar(255) NOT NULL,
    chatTime datetime NOT NULL PRIMARY KEY
);

INSERT INTO generalChat (username, chat, chatTime) VALUES ("parker", "hello world", UTC_TIMESTAMP());

-- CREATE TABLE burgers
-- (
--   id int AUTO_INCREMENT PRIMARY KEY,
--   burger_name varchar (50) NOT NULL,
--   devoured BOOLEAN
-- );