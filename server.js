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
        {
          name: "Delete",
          value: deleteItems
        },
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
        {
          name: "Add a Role.",
          value: addRole
        },
        {
          name: "Add a Department.",
          value: addDepartment
        },
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
    });

}

function addEmployee() {
  inquirer.prompt([{
      name: "first",
      type: "input",
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
      choices: 
      [
        {
          name: "Sales Entry",
          value: 1
        },
        {
          name: "Sales Lead",
          value: 2
        },
        {
          name: "Sales Manager",
          value: 7
        },
        {
          name: "Accounting Clerk",
          value: 3
        },
        {
          name: "Accounting Lead",
          value: 4
        },
        {
          name: "Accounting Manager",
          value: 9
        },
        {
          name: "Engineer One",
          value: 5
        },
        {
          name: "Engineer Two",
          value: 6
        },
        {
          name: "Engineer Manager",
          value: 8
        }
      ]
    },
    {
      type: "list",
      name: "manager",
      message: "Who is the Employee's Manager?",
      choices: 
      [
        {
          name: "Roger Waters",
          value: 9
        },
        {
          name: "David Gilmour",
          value: 10
        },
        {
          name: "Roger Daltrey",
          value: 11
        }
      ]}]).then(function(response) {

        connection.query("INSERT INTO employees SET ?", {
        first_name: response.first, 
        last_name: response.last, 
        manager_id: response.manager,
        role_id: response.role
      })
      console.log("This Employee has been added to the Database");
      start()
  });

}


function addRole() {
  inquirer.prompt([{
      name: "role",
      type: "input",
      message: "What Role would you like to add?"
    },
    {
      name: "salary",
      type: "input",
      message: "What is the Salary of the Role?"
    },
    {
      name: "department",
      type: "list",
      message: "What Department is the Role in?",
      choices: 
      [
        {
          name: "Sales",
          value: 1
        },
        {
          name: "Accounting",
          value: 2
        },
        {
          name: "Engineering",
          value: 3
        }
      ]
      }]).then(function(response) {

        connection.query("INSERT INTO roles SET ?", {
        title: response.role, 
        salary: response.salary, 
        department_id: response.department,
      })
      console.log("This Role has been added to the Database");
      start()
  });

}

function addDepartment() {
  inquirer.prompt([{
      name: "department",
      type: "input",
      message: "What Department would you like to add?"
    }]).then(function(response) {

        connection.query("INSERT INTO departments SET ?", {
        dept_name: response.department, 
      })
      console.log("This Department has been added to the Database");
      start()
  });

}


// function updateEmployeeRole() {
//   const options = []
//   const jobs = []
//   console.log(options)
//   connection.query("SELECT * FROM employees, roles WHERE roles.role_id = employees.role_id", function (err, res) {
//     if (err) throw err;
//     for (var i = 0 ; i < res.length ; i++) {
//       options.push(res[i].first_name);
//       jobs.push(res[i].role_id + res[i].title);
//     }
//   })
//     inquirer.prompt([
//       {
//         name: "employee",
//         type: "list",
//         message: "Which Employee's Role would you like to update?",
//         choices: [
//           options
//         ]
//       },
//       {
//         name: "role",
//         type: "list",
//         message: "Select the new Role for the Employee.", 
//         choices: [
//           jobs
//         ]
//       }
//     ]).then(function(response) {
//     response.role()
//     connection.query("UPDATE employees SET ? WHERE?", [{
//       role_id: response.role.role_id
//     },{
//       first_name: response.employee
//     }])
    
//     console.log("This Employee's Role has been updated in the Database");
//     start()
//     })
// }





function deleteItems() { 
  inquirer
  .prompt({
    name: "delete",
    type: "list",
    message: "What would you like to Remove from the Database?",
    choices: [
      {
        name: "Remove employee.",
        value: deleteEmployees
      },
      {
        name: "Remove Roles.",
        value: deleteRoles
      },
      {
        name: "Remove Department.",
        value: deleteDepartments
      }
    ]
  })
  .then(function(response) {
    response.delete();
    
  })
}

function deleteEmployees() {
  inquirer.prompt([{
      name: "delete",
      type: "list",
      message: "Which Employee would you like to Remove?",
      choices: [
        "John",
        "Jimmy",
        "Paul",
        "Ringo",
        "Robert",
        "George",
        "Mick",
        "Keith",
        "Roger",
        "David",
        "Roger",
        "Jack"
      ]
    }]).then(function(response) {
      connection.query("DELETE FROM employees WHERE ?",{
          first_name: response.delete
      })
      start()
  
  })
}

function deleteRoles() {
  inquirer.prompt([{
      name: "delete",
      type: "list",
      message: "What Role would you like to Remove?",
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
    }]).then(function(response) {
      connection.query("DELETE FROM roles WHERE ?",{
          title: response.delete
      })
      start()
  
  })
}

function deleteDepartments() {
  inquirer.prompt([{
      name: "delete",
      type: "list",
      message: "What Department would you like to Remove?",
      choices: 
      [
        {
          name: "Sales",
          value: 1
        },
        {
          name: "Accounting",
          value: 2
        },
        {
          name: "Engineering",
          value: 3
        },
      ]
    }]).then(function(response) {
      connection.query("DELETE FROM departments WHERE ?",{
          dept_name: response.delete
      })
      start()
     
  })

}


function exitDatabase() {
  console.log("Thank you! You have exicted the Database. Goodbye!")
  connection.end()
}