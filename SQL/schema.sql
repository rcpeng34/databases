#CREATE DATABASE chat;

USE chat;

DROP TABLE messages;

DROP TABLE users;

DROP TABLE chatroom;

DROP TABLE friends;

CREATE TABLE messages (
  messageId int,
  createdAt datetime,
  messageText varchar(1000),
  messageUserId int,
  messageRoomId int
);

CREATE TABLE users (
  userId int,
  userName varchar(50)
);


CREATE TABLE chatroom (
  roomId int,
  roomName varchar(50)
);

CREATE TABLE friends (
  userId int,
  friendId int
);



/* You can also create more tables, if you need them... */

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/
