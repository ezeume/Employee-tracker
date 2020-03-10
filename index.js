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

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);

  initialPrompt()
});

function initialPrompt() {
  inquirer.prompt([
    {
      type: "list",
      message: "WELCOME! What would you like to do?",
      name: "employeeAction",
      choices: ["View all Employees", "View all Employees by Department", "View all Employees by Manager", "Add Employee", "Update Employee Role", "Update Employee Manager", "Remove Employee", "View all Role", "Add Role", "Remove Role", "View all Department", "Add Department", "Remove Department", "Exit"]
    }
  ]).then(function (actionAnswers) {
    console.log(actionAnswers);
    if (actionAnswers.employeeAction == "View all Employees") {
      viewAllEmployees();
    }
    else if (actionAnswers.employeeAction == "View all Employees by Department") {
      viewAllEmployeesByDepartment();
    }
    else if (actionAnswers == "View all Employees by Manager") {
      viewAllEmployeesByManager();
    }
    else if (actionAnswers == "View all Department") {
      viewAllEmployeesByDepartment();
    }
    else if (actionAnswers == "View all Role") {
      viewAllRole();
    }
    else if (actionAnswers == "Add Department") {
      addDepartment();
    }
    else if (actionAnswers == "Add Employee") {
      addEmployee();
    }
    else if (actionAnswers == "Add Role") {
      addRole();
    }
    else if (actionAnswers == "Update Employee Role") {
      updateEmployeeRole();
    }
    else if (actionAnswers == "Update Employee Manager") {
      updateEmployeeManager();
    }
    else if (actionAnswers == "Remove Employee") {
      removeEmployee();
    }
    else if (actionAnswers == "Remove Role") {
      removeRole();
    }
    else if (actionAnswers == "Remove Department") {
      removeDepartment();
    }
    else if (actionAnswers == "Exit") {
      exit();
    }
  })
}



function viewAllEmployees() {
  console.log("to-do finish writing this function")
}
function viewAllEmployeesByDepartment() {
  console.log("to-do finish writing this function")
}
function viewAllEmployeesByManager() {
  console.log("to-do finish writing this function")
}
function viewAllEmployeesByDepartment() {
  console.log("to-do finish writing this function")
}
function viewAllRole() {
  console.log("to-do finish writing this function")
}
function addDepartment() {
  console.log("to-do finish writing this function")
}
function addEmployee() {
  console.log("to-do finish writing this function")
}
function addRole() {
  console.log("to-do finish writing this function")
}
function updateEmployeeRole() {
  console.log("to-do finish writing this function")
}
function updateEmployeeManager() {
  console.log("to-do finish writing this function")
}
function removeEmployee() {
  console.log("to-do finish writing this function")
}
function removeRole() {
  console.log("to-do finish writing this function")
}
function removeDepartment() {
  console.log("to-do finish writing this function")
}