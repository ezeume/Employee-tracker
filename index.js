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
      choices: ["View all Employees", "View all Employees by Department", "View all Employees by Manager", "View all Department", "View all Role", "Add Department", "Add Employee", "Add Role", "Update Employee Role", "Update Employee Manager", "Remove Employee", "Remove Role", "Remove Department", "Exit"]
    }
  ]).then(function (actionAnswers) {
    // console.log(actionAnswers);
    console.log(actionAnswers.employeeAction)
    if (actionAnswers.employeeAction == "View all Employees") {
      viewAllEmployees();
    }
    else if (actionAnswers.employeeAction == "View all Employees by Department") {
      viewAllEmployeesByDepartment();
    }
    else if (actionAnswers.employeeAction == "View all Employees by Manager") {
      viewAllEmployeesByManager();
    }
    else if (actionAnswers.employeeAction == "View all Department") {
      viewAllDepartment();
    }
    else if (actionAnswers.employeeAction == "View all Role") {
      viewAllRole();
    }
    else if (actionAnswers.employeeAction == "Add Department") {
      console.log("inside if statement ln 53")
      addDepartment();
    }
    else if (actionAnswers.employeeAction == "Add Employee") {
      addEmployee();
    }
    else if (actionAnswers.employeeAction == "Add Role") {
      addRole();
    }
    else if (actionAnswers.employeeAction == "Update Employee Role") {
      updateEmployeeRole();
    }
    else if (actionAnswers.employeeAction == "Update Employee Manager") {
      updateEmployeeManager();
    }
    else if (actionAnswers.employeeAction == "Remove Employee") {
      removeEmployee();
    }
    else if (actionAnswers.employeeAction == "Remove Role") {
      removeRole();
    }
    else if (actionAnswers.employeeAction == "Remove Department") {
      removeDepartment();
    }
    else if (actionAnswers.employeeAction == "Exit") {
      exit();
    }
  })
}



function viewAllEmployees() {
  connection.query("SELECT * FROM employees;", function(err, res){
    if (err) throw err;
    // console.log(res)
    console.table(res)
    // console.log("to-do finish writing this function")
    initialPrompt()
  });
  
}
function viewAllEmployeesByDepartment() {
  inquirer.prompt([
    {
      type: "list",
      message: "What department?",
      name: "department",
      choices: [{
        name: "Human Resources",
        value: 10
      },{
        name: "IT",
        value: 20
      },{
        name: "Marketing",
        value: 30
      }]
    }
  ]).then(function(departmentChoices){
    console.log(departmentChoices.department);
    connection.query("SELECT employees.id, employees.firstName, employees.lastName, employees.roleId FROM employees WHERE roleId = ?;",[departmentChoices.department], function(err, res){
      if (err) throw err;
      console.table(res)
    })
  });

}

function viewAllEmployeesByManager() {
  connection.query("SELECT")
  console.log("to-do finish writing this function")
}

function viewAllDepartment() {
  connection.query("SELECT name FROM departments;", function(err, res){
    if (err) throw err;
    console.table(res)
    initialPrompt();
  })
  // console.log("to-do finish writing this function")
}

//view all roles
function viewAllRole() {
  connection.query("SELECT * FROM roles;", function(err, res){
    if (err) throw err;
    console.table(res)
    initialPrompt();
  });
}

//Add Department --check 
function addDepartment() {
  inquirer.prompt([
    {
      type: "input",
      message: "What department do you want to add?",
      name: "newDepartment"
      
    }
  ]).then(function(newDepartmentName){
    console.log(newDepartmentName.newDepartment)
    connection.query("INSERT INTO departments (name) VALUES ('Finance')", function(err, res){
      if (err) throw err;
      console.table(res)
      initialPrompt()
    })
  });
  
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