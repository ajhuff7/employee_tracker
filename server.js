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
        
      case "Exit":
        exitDatabase();
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
  var query = "SELECT * FROM employees"
  // employees.employees_id, employees.first_name, employees.last_name, roles.title, departments.dept_name, roles.salary, emnployees.manager_id FROM employees JOIN roles ON roles.id = employees.roles_id JOIN departments ON departments.department_id = roles.department_id";
  // console.log(query)
  connection.query(query, function (err, res){
    if (err) throw err;
    for (var i = 0; i < res.length; i++){
      console.table(`${res[i].employees_id} | ${res[i].first_name} | ${res[i].last_name}`);
    }
  });

}


// function viewEmployeesByDept() {
//   connection.query("SELECT * FROM departments", function (err, res){
  
//     var table = new cTable({
//       head: ["ID#", "Department"],
//     });

//     if (err) throw err;

//     for (var i = 0; i < res.length; i++) {
//       table.push(
//           [res[i].department_id, res[i].dept_name],
//       );
//     }
//     console.log(table.toString());
//     start()
//   });

// }
























// function modifyItems() { 
//   inquirer
//   .prompt({
//     name: "modify",
//     type: "rawlist",
//     message: "What would you like to modify?",
//     choices: [
//       "Add Employee.",
//       "Add Role.",
//       "Add Department.",
//       "Update Employee Role.",
//       "Update Employee Manager."
//     ]
  
//   })
// }


// function deleteItems() { 
//   inquirer
//   .prompt({
//     name: "delete",
//     type: "rawlist",
//     message: "What would you like to remove?",
//     choices: [
//       "Remove employee.",
//       "Remove Roles.",
//       "Remove Department."
//     ]
  
//   })
// }



// function exitDatabase() {
//   console.log("Thank you, you have exicted the Database. Goodbyye.")
//   connection.end()
// }