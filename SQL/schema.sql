#CREATE DATABASE chat;

USE chat;

-- drop table if exists messages;
-- drop table if exists users;
-- drop table if exists rooms;
-- drop table if exists friends;

-- CREATE TABLE messages (
--   'id' int NOT NULL AUTO_INCREMENT,
--   'createdAt' datetime,
--   'message' varchar(1000),
--   'userId' int,
--   'roomId' int,
--   PRIMARY KEY ('id')
-- );

-- CREATE TABLE users (
--   'id' int NOT NULL,
--   'name' varchar(50),
--   PRIMARY KEY ('id')
-- );


-- CREATE TABLE rooms (
--   'id' int NOT NULL,
--   'name' varchar(50),
--   PRIMARY KEY ('id')
-- );

-- CREATE TABLE friends (
--   'userId' int,
--   'friendId' int,
-- );

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `createdAt` DATETIME NULL DEFAULT NULL,
  `message` VARCHAR(1000) NULL DEFAULT NULL,
  `userId` INTEGER NULL DEFAULT NULL,
  `roomId` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) COMMENT 'new';

-- ---
-- Table 'users'
--
-- ---

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'rooms'
--
-- ---

DROP TABLE IF EXISTS `rooms`;

CREATE TABLE `rooms` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'friends'
--
-- ---

DROP TABLE IF EXISTS `friends`;

CREATE TABLE `friends` (
  `userId` INTEGER NULL DEFAULT NULL,
  `friendId` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`userId`)
);


/* You can also create more tables, if you need them... */

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/
