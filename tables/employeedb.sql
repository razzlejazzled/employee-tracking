DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE people(
    id INTEGER NOT NULL AUTO_INCREMENT,
    firstName VARCHAR (30) NOT NULL,
    lastName VARCHAR (30) NOT NULL,
    FOREIGN KEY (roleID) REFERENCES roles(id), 
    FOREIGN KEY (managerID) REFERENCES people(id),
    PRIMARY KEY (id),

);

CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (30) NOT NULL,
    salary DECIMAL,
    FOREIGN KEY (departmentID) REFERENCES department(id),
    PRIMARY KEY (id),
);

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    departmentName VARCHAR(30),
    PRIMARY KEY (id)
)