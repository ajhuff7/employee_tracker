var mysql = require("mysql");
var inquirer = require("inquirer");
const table = require('console.table');


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
        {
          name: "View all Employees.",
          value: viewEmployees(),
        },
        {
          name: "View employees by Department.",
          value: viewEmployeesByDept,
        },
        // {
        //   name: "View employees by Manager.",
        //   value: viewEmployeesByMgr, 
        // },
        // {
        //   name: "View all Roles.",
        //   value: viewRoles, 
        // },
        // {
        //   name: "View all Departments.",
        //   value: viewDept, 
        // },
        // {
        //   name: "View Department utilized budgets.",
        //   value: viewDeptBudgets, 
        // }
      ]
    })
    .then(function(response) {
      response.view();
      
    })
}

function viewEmployees() {
  var query = "SELECT employees.employee_id, employees.first_name, employees.last_name, roles.title, departments.dept_name, roles.salary, employees.manager_id FROM employees JOIN roles ON roles.role_id = employees.role_id JOIN departments ON departments.department_id = roles.department_id";

  // console.log(query);
  connection.query(query, function (err, res){
    if (err) throw err;
    console.table(res)
    start();  
  });

}


function viewEmployeesByDept() {
  var query = "SELECT departments.dept_name, employees.employee_id, employees.first_name, employees.last_name, roles.title, departments.dept_name, roles.salary, employees.manager_id FROM employees JOIN roles ON roles.role_id = employees.role_id JOIN departments ON departments.department_id = roles.department_id ORDER BY departments.department_id DESC";
  connection.query(query, function (err, res){
    if (err) throw err;
    console.table(res)
    start();
  });

}

function viewEmployeesByMgr() {
  var query = "SELECT employees.employee_id, employees.first_name, employees.last_name, roles.title, departments.dept_name, roles.salary FROM employees JOIN roles ON roles.role_id = employees.role_id JOIN departments ON departments.department_id = roles.department_id";

  // console.log(query);
  connection.query(query, function (err, res){
    if (err) throw err;
    for (var i = 0; i < res.length; i++){
      console.log([res[i].employee_id, res[i].first_name, res[i].last_name, res[i].title, res[i].dept_name, res[i].salary])
    };
    start();  
  });
  


}






















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