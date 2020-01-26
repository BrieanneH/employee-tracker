DROP DATABASE IF EXISTS employeeInfo_db;

CREATE DATABASE employeeInfo_db;

USE employeeInfo_db;

CREATE TABLE department (
    name VARCHAR(30),
    id INT NOT NULL AUTO_Increment,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    id INT NOT NULL AUTO_Increment,
    role_id INTEGER,
    manager_id INTEGER,
    PRIMARY KEY (id)

);

CREATE TABLE role (
    title VARCHAR(30) NOT NULL,
    salary DEC NOT NULL,
    id INT NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);