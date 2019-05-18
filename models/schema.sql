CREATE DATABASE messages_db;
USE messages_db;

-- Chatroom Metadata
CREATE TABLE chatrooms (
    id int AUTO_INCREMENT,
    chatRoomName varchar (50) NOT NULL,
    permanant BOOLEAN,
    PRIMARY KEY (id)
);

INSERT INTO chatrooms (chatRoomName, permanant) VALUES ("room1", true);
INSERT INTO chatrooms (chatRoomName, permanant) VALUES ("generalChat", true);

CREATE TABLE generalChat (
    username varchar(20) NOT  NULL,
    chat varchar(255) NOT NULL,
    chatTime datetime NOT NULL PRIMARY KEY,
    id int AUTO_INCREMENT
);

INSERT INTO generalChat (username, chat, chatTime) VALUES ("parker", "hello world", UTC_TIMESTAMP())

-- CREATE TABLE burgers
-- (
--   id int AUTO_INCREMENT PRIMARY KEY,
--   burger_name varchar (50) NOT NULL,
--   devoured BOOLEAN
-- );