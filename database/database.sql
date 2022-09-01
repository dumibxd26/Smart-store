CREATE DATABASE users_db;

CREATE TABLE user_info(
    id serial PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    birth_date DATE NOT NULL,
    password VARCHAR(255) NOT NULL
);