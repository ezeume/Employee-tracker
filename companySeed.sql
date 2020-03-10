DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;

-- employee table
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(30) NOT NULL,
  lastName VARCHAR(30) NOT NULL,
  roleId INT,
  managerId INT,
  PRIMARY KEY (id)
);

-- role table
CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 4) NOT NULL,
    departmentId INT NOT NULL,
    PRIMARY KEY (id)
);

-- department table
CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO employee (firstName, lastName, roleId, managerId)
VALUES ("Nelson", "Ezeume", 01, 10), ("Bill", "Scott", 02, 20 ), ("Tom", "Hanks" 03, 30);

INSERT INTO role (title, salary, departmentId)
VALUES ("Manager",95000, 111), ("Marketer", 70000, 222), ("Software Engineer", 110000, 333);

INSERT INTO department (name)
VALUES ("Administration"), ("Marketing"), ("IT");

-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);
