DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    departmentName VARCHAR(30),
    PRIMARY KEY (id)
);
CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (30) NOT NULL,
    salary DECIMAL,
    departmentID INT,
    FOREIGN KEY (departmentID) REFERENCES department(id),
    PRIMARY KEY (id)
);
CREATE TABLE people(
    id INTEGER NOT NULL AUTO_INCREMENT,
    firstName VARCHAR (30) NOT NULL,
    lastName VARCHAR (30) NOT NULL,
    roleID INT,
    managerID INT,
    FOREIGN KEY (roleID) REFERENCES roles(id), 
    FOREIGN KEY (managerID) REFERENCES people(id),
    PRIMARY KEY (id)

);

INSERT INTO department (departmentName)
VALUES ("Legal");

INSERT INTO department (departmentName)
VALUES ("Sales");

INSERT INTO department (departmentName)
VALUES ("Accounting");

INSERT INTO department (departmentName)
VALUES ("Software Development");

INSERT INTO roles (title, salary, departmentID)
VALUES ("Sales Lead", 65.000, 2);
INSERT INTO roles (title, salary, departmentID)
VALUES ("Sales Person", 45.000, 2);
INSERT INTO roles (title, salary, departmentID)
VALUES ("Lead Engineer", 90.000, 4);
INSERT INTO roles (title, salary, departmentID)
VALUES ("Software Developer", 70.000, 4);
INSERT INTO roles (title, salary, departmentID)
VALUES ("Account Manager", 80.000, 3 );
INSERT INTO roles (title, salary, departmentID)
VALUES ("Accountant", 60.000, 3);
INSERT INTO roles (title, salary, departmentID)
VALUES ("Legal Team Lead", 99.000, 1);
INSERT INTO roles (title, salary, departmentID)
VALUES ("Lawyer", 80.001, 1)

INSERT INTO people (firstName, lastName, roleID, managerID)
VALUES ("Frank", "Cook", 1, 1);
INSERT INTO people (firstName, lastName, roleID, managerID)
VALUES ("Monique", "Williams", 3, 2);
INSERT INTO people (firstName, lastName, roleID, managerID)
VALUES ("Michael", "Thomas", 2, 1);
INSERT INTO people (firstName, lastName, roleID, managerID)
VALUES ("Sam", "Mason", 4, 2);
