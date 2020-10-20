var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "staff_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected");
    start();
})


function start() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "How would you like to interact with the database?",
      choices: [
        "View",
        "Modify",
        "Delete",
        "Quit"
      ]
    })
    .then(function(response) {
      switch (response.action) {
      case "View":
        viewItems();
        break;

      case "Modify":
        modifyItems();
        break;

      case "Delete":
        deleteItems();
        break;
        
      case "Quit":
        quitDatabase();
        break;
      }
    });
}

function viewItems() {
  inquirer
    .prompt({
      name: "view",
      type: "rawlist",
      message: "What would you like to view?",
      choices: [
        "View all Employees.",
        "View employees by Department.",
        "View employees by Manager.",
        "View all Roles.",
        "View all Departments.",
        "View Department utilized budgets."
      ]
    })
    .then(function(response) {
      switch (response.action) {
      case "View all Employees.":
        viewEmployees();
        break;

      case "View employees by Department.":
        viewEmployeesByDept();
        break;

      case "View employees by Manager.":
        viewEmployeesByMgr();
        break;
        
      case "View all Roles.":
        viewRoles();
        break;
        
      case "View all Departments.":
        viewDept();
        break;

      case "View Department utilized budgets.":
        viewDeptBudgets();
        break;
      }

    });
}

function viewEmployees() {
  connection.query(query, function (err, res){

  });

}











function modifyItems() { 
  inquirer
  .prompt({
    name: "modify",
    type: "rawlist",
    message: "What would you like to modify?",
    choices: [
      "Add Employee.",
      "Add Role.",
      "Add Department.",
      "Update Employee Role.",
      "Update Employee Manager."
    ]
  
  })
}