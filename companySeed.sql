DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;

-- employee table
CREATE TABLE employees(
  id INT NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(30) NOT NULL,
  lastName VARCHAR(30) NOT NULL,
  roleId INT,
  managerId INT,
  PRIMARY KEY (id)
);

-- role table
CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    departmentId INT NOT NULL,
    PRIMARY KEY (id)
);

-- department table
CREATE TABLE departments(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO employee (firstName, lastName, roleId, managerId)
VALUES ("Nelson", "Ezeume", 10, 1), ("Bill", "Scott", 10, 11 ), ("Tom", "Hanks", 10, 11), ("Janet", "Green", 20, 2), ("Ricky", "Botin", 20, 22), ("Nancy", "Trash", 20, 22), ("Gary", "Owen", 30, 3), ("Murphy", "Lohan", 30, 33), ("Chuck", "Norris", 30, 33);

INSERT INTO role (title, salary, departmentId)
VALUES ("Marketer",95000, 101), ("HR", 70000, 202), ("Software Engineer", 110000, 303);

INSERT INTO department (name)
VALUES ("Marketing"), ("Human Resources"), ("IT");

-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);
