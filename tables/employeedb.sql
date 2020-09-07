DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE people(
    id INTEGER NOT NULL AUTO_INCREMENT,
    firstName VARCHAR (30) NOT NULL,
    lastName VARCHAR (30) NOT NULL,
    role_id INT 
    manager_id INT 
    PRIMARY KEY (id)

);

CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (30) NOT NULL,
    salary DECIMAL ,
    deparment_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE department(
    id INTE NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
)