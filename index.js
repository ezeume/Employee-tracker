const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");
const dotenv = require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: process.env.MYSQL_PASS,
  database: process.env.DB_NAME  
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    
    initialPrompt()
  });

  function initialPrompt(){
    inquirer.prompt([
      {
        type: "list",
        message: "WELCOME! What would you like to do?",
        name: "employeeAction",
        choices: ["View all Employees", "View all Employees by Department", "View all Employees by Manager", "Add Employee", "Update Employee Role", "Update Employee Manager", "Remove Employee", "View all Role", "Add Role", "Remove Role", "View all Department", "Add Department", "Remove Department", "Exit"]
      }
    ]).then()
  }