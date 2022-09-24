CREATE DATABASE users_db;

CREATE TABLE user_info(
    id serial PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    birthDate DATE NOT NULL,
    password VARCHAR(255) NOT NULL
);