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


//View all employees
function viewAllEmployees() {
  connection.query("SELECT * FROM employees;", function (err, res) {
    if (err) throw err;
    // console.log(res)
    console.table(res)
    // console.log("to-do finish writing this function")
    initialPrompt()
  });

}

//View all employees by department
function viewAllEmployeesByDepartment() {
  inquirer.prompt([
    {
      type: "list",
      message: "What department's employees?",
      name: "department",
      choices: [{
        name: "Human Resources",
        value: 10
      }, {
        name: "IT",
        value: 20
      }, {
        name: "Marketing",
        value: 30
      }]
    }
  ]).then(function (departmentChoices) {
    console.log(departmentChoices.department);
    connection.query("SELECT employees.id, employees.firstName, employees.lastName, employees.roleId FROM employees WHERE roleId = ?;", [departmentChoices.department], function (err, res) {
      if (err) throw err;
      console.table(res)
    })
  });

}

//View all employees by manager
function viewAllEmployeesByManager() {
  inquirer.prompt([
    {
      type: "list",
      message: "What manager's employees?",
      name: "manager",
      choices: [{
        name: "Nelson Ezeume",
        value: 1
      }, {
        name: "Janet Green",
        value: 2
      }, {
        name: "Gary Owen",
        value: 3
      }]
    }
  ]).then(function (managertChoices) {
    connection.query("SELECT employees.id, employees.firstName, employees.lastName, employees.roleId FROM employees WHERE managerId = ?;", [], function (err, res) {
      if (err) throw err;
      console.table(res)
    })

  });

}

//View all departments
function viewAllDepartment() {
  connection.query("SELECT name FROM departments;", function (err, res) {
    if (err) throw err;
    console.table(res)
    initialPrompt();
  })
  // console.log("to-do finish writing this function")
}

//view all roles
function viewAllRole() {
  connection.query("SELECT * FROM roles;", function (err, res) {
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
  ]).then(function (newDepartmentName) {
    console.log(newDepartmentName.newDepartment)
    connection.query("INSERT INTO departments (name) VALUES (?)", [newDepartmentName.newDepartment], function (err, res) {
      if (err) throw err;
      // console.table(res)
      initialPrompt()
    })
  });

}

//Add employees
function addEmployee() {
  inquirer.prompt([
    {
      type: "input",
      message: "Which employee do you want to add?",
      name: "newEmployee"
    }
  ]).then(function (newEmployeeName) {
    console.log(newEmployeeName.newEmployee)
    connection.query("INSERT INTO employees(name) VALUES (?)", [newEmployeeName.newEmployee], function (err, res) {
      if (err) throw err;
      initialPrompt()
    })
  });

}

//Add roles
function addRole() {
  inquirer.prompt([
    {
      type: "input",
      message: "What role do you want to add?",
      name: "newRole"
    }
  ]).then(function (newRoleName) {
    connection.query("INSERT INTO roles(title) VALUES (?)", [newRoleName.newRole], function (err, res) {
      if (err) throw err;
      initialPrompt()
    })
  });


}


//Update employee role
function updateEmployeeRole() {
  const employeesArr = [];
  connection.query("SELECT * FROM employees", function (err, res) {
    if (err) throw err;

    for (i = 0; res.length > i; i++) {
      employeesArr.push(res[i].firstName + " " + res[i].lastName);

    }
    console.log(employeesArr);

    inquirer.prompt([
      {
        type: "list",
        message: "What employee do you want to update?",
        name: "updateEmployee",
        choices: employeesArr
      }
    ]).then(function (employeeAnswer) {
      let employeeId;

      const employeeFullName = employeeAnswer.updateEmployee.split(" ");

      for (i = 0; i < res.length; i++) {
        if (res[i].firstName == employeeFullName[0] && res[i].lastName == employeeFullName[1]) {
          employeeId = res[i].id
        }

      }
      
      const rolesArr = [];

      connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;

        for (i = 0; res.length > i; i++) {
          rolesArr.push(res[i].title)

        }
        console.log(rolesArr);

        inquirer.prompt([
          {
            type: "list",
            message: "What role do you want to update?",
            name: "updateRole",
            choices: rolesArr
          }
        ]).then(function (rolesAnswer) {
          let roleId;
          for (i = 0; i < res.length; i++) {
            if (res[i].title == rolesAnswer.updateRole) {
              roleId = res[i].id

            }

          }

          connection.query("update employees SET roleId = ? WHERE id = ?", [roleId, employeeId], function (err, data) {
            console.log("updated successfully!");
          });

        })
      })
    });
  });
      console.log("to-do finish writing this function")
    }


    //Update employee manager
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