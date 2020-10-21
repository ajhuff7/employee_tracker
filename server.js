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
      type: "list",
      message: "How would you like to interact with the database?",
      choices: [
        {
          name: "View",
          value: viewItems
        },
        {
          name: "Modify",
          value: modifyItems
        },
        // {
        //   name: "Delete",
        //   value: deleteItems
        // },
        {
          name: "Quit",
          value: exitDatabase
        },

      ]
    })
    .then(function(response) {
      response.action();
     
    })
}



function viewItems() {
  inquirer
    .prompt({
      name: "view",
      type: "list",
      message: "What would you like to view?",
      choices: [
        {
          name: "View all Employees.",
          value: viewEmployees
        },
        {
          name: "View Employees by Department.",
          value: viewEmployeesByDept
        },
        {
          name: "View Employees by Manager.",
          value: viewEmployeesByMgr
        },
        {
          name: "View all Roles.",
          value: viewRoles
        },
        {
          name: "View all Departments.",
          value: viewDept
        },
        {
          name: "View Department utilized budgets.",
          value: viewDeptBudgets
        }
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
  var query = "SELECT departments.dept_name, employees.employee_id, employees.first_name, employees.last_name, roles.title, roles.salary, employees.manager_id FROM employees JOIN roles ON roles.role_id = employees.role_id JOIN departments ON departments.department_id = roles.department_id ORDER BY departments.department_id ASC";
  connection.query(query, function (err, res){
    if (err) throw err;
    console.table(res)
    start();
  });

}

function viewEmployeesByMgr() {
  var query = "SELECT employees.manager_id, employees.employee_id, employees.first_name, employees.last_name, roles.title, departments.dept_name, roles.salary FROM employees JOIN roles ON roles.role_id = employees.role_id JOIN departments ON departments.department_id = roles.department_id ORDER BY employees.manager_id, employees.employee_id";
  connection.query(query, function (err, res){
    if (err) throw err;
    console.table(res)
    start();
  });

}

function viewRoles() {
  var query = "SELECT roles.role_id, roles.title, roles.salary, departments.dept_name FROM roles JOIN departments ON departments.department_id = roles.department_id";
  connection.query(query, function (err, res){
    if (err) throw err;
    console.table(res)
    start();
  });

}

function viewDept() {
  var query = "SELECT departments.department_id, departments.dept_name FROM departments";
  connection.query(query, function (err, res){
    if (err) throw err;
    console.table(res)
    start();
  });

}

function viewDeptBudgets() {
  inquirer
    .prompt({
      name: "budgets",
      type: "list",
      message: "Which Department budget would you like to view?",
      choices: [
        {
          name: "Sales",
          value: salesBudget
        },
        {
          name: "Accounting",
          value: accountingBudget
        },
        {
          name: "Engineering",
          value: engineeringBudget
        },
      ]  
    })
    
    .then(function(response) {
      response.budgets();
    })
}



function salesBudget() {
  var query = "SELECT departments.department_id, departments.dept_name, SUM(roles.salary) FROM departments JOIN roles ON departments.department_id = roles.department_id WHERE departments.department_id = 1";
  connection.query(query, function (err, res){
    if (err) throw err;

    console.table(res)
    start();
  });

}

function accountingBudget() {
  var query = "SELECT departments.department_id, departments.dept_name, SUM(roles.salary) FROM departments JOIN roles ON departments.department_id = roles.department_id WHERE departments.department_id = 2";
  connection.query(query, function (err, res){
    if (err) throw err;

    console.table(res)
    start();
  });

}

function engineeringBudget() {
  var query = "SELECT departments.department_id, departments.dept_name, SUM(roles.salary) FROM departments JOIN roles ON departments.department_id = roles.department_id WHERE departments.department_id = 3";
  connection.query(query, function (err, res){
    if (err) throw err;

    console.table(res)
    start();
  });

}



function modifyItems() {
  inquirer
    .prompt({
      name: "modify",
      type: "list",
      message: "What would you like to modify?",
      choices: [
        {
          name: "Add an Employee.",
          value: addEmployee
        },
        // {
        //   name: "Add a Role.",
        //   value: addRole
        // },
        // {
        //   name: "Add a Department.",
        //   value: addDepartment
        // },
        // {
        //   name: "Update an Employee Role.",
        //   value: updateEmployeeRole
        // },
        // {
        //   name: "Update an Employee's Manager.",
        //   value: updateEmployeeManager
        // }
      ]

    })
    .then(function(response) {
      response.modify();
      
    })
}

function addEmployee() {
  inquirer
    .prompt(
      {
        type: "input",
        name: "first",
        message: "What is the Employee's first name?"
      },
      {
        type: "input",
        name: "last",
        message: "What is the Employee's last name?"
      },
      {
        type: "list",
        name: "role",
        message: "What is the Employee's Role?",
        choices: [
          "Sales Entry",
          "Sales Lead",
          "Sales Manager",
          "Accounting Clerk",
          "Accounting Lead",
          "Accounting Manager",
          "Engineer One",
          "Engineer Two",
          "Engineer Manager"
        ]
      },
      {
        type: "list",
        name: "manager",
        message: "Who is the Employee's Manager?",
        choices: [
          "Roger Waters",
          "David Gilmour",
          "Roger Daltrey"
        ]
      }
  
    )
    .then(function(response) {
      response.modify();
      console.log(`${response.first}${response.last} has been added to the database!`);
    })
}






function setEmployee() {
  var query = "INSERT INTO employees, roles SET (first_name = ${}, last_name, roles.title, manager_id FROM employees JOIN roles ON roles.role_id = employees.role_id JOIN departments ON departments.department_id = roles.department_id";

  // console.log(query);
  connection.query(query, function (err, res){
    if (err) throw err;
    console.log("New Employee Added!")
    start();  
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });


}








"Sales Entry"
"Sales Lead"
"Sales Manager"
"Accounting Clerk"
"Accounting Lead"
"Accounting Manager"
"Engineer One"
"Engineer Two"
"Engineer Manager"






// function start() {
//   inquirer
//     .prompt({
//       name: "action",
//       type: "rawlist",
//       message: "How would you like to interact with the database?",
//       choices: [
//         "View",
//         "Modify",
//         "Delete",
//         "Quit"
//       ]
//     })
//     .then(function(response) {
//       switch (response.action) {
//       case "View":
//         viewItems();
//         break;

//       case "Modify":
//         modifyItems();
//         break;

//       case "Delete":
//         deleteItems();
//         break;
        
//       case "Exit":
//         exitDatabase();
//         break;
//       }
//     });
// }









// function deleteItems() { 
//   inquirer
//   .prompt({
//     name: "delete",
//     type: "list",
//     message: "What would you like to remove?",
//     choices: [
//       "Remove employee.",
//       "Remove Roles.",
//       "Remove Department."
//     ]
  
//   })
// }



function exitDatabase() {
  console.log("Thank you, you have exicted the Database. Goodbyye.")
  connection.end()
}