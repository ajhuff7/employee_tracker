USE staff_DB;


-- inserting department table contents
INSERT INTO departments (dept_name)
VALUES ("Sales"), ("Accounting"), ("Engineering");


-- inserting roles table contents
INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Entry", 6000, (SELECT department_id FROM departments WHERE dept_name= "Sales"));

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 12000, (SELECT department_id FROM departments WHERE dept_name= "Sales"));

INSERT INTO roles (title, salary, department_id)
VALUES ("Accounting Clerk", 5000, (SELECT department_id FROM departments WHERE dept_name= "Accounting"));

INSERT INTO roles (title, salary, department_id)
VALUES ("Accounting Lead", 10000, (SELECT department_id FROM departments WHERE dept_name= "Accounting"));

INSERT INTO roles (title, salary, department_id)
VALUES ("Engineer One", 7000, (SELECT department_id FROM departments WHERE dept_name= "Engineering"));

INSERT INTO roles (title, salary, department_id)
VALUES ("Engineer Two", 14000, (SELECT department_id FROM departments WHERE dept_name= "Engineering"));


-- inserting employees table contents
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("John", "Lennon", (SELECT role_id FROM roles WHERE title= "Sales Entry"), 9);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jimmy", "Page", (SELECT role_id FROM roles WHERE title= "Sales Entry"), 9);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Paul", "McCartney", (SELECT role_id FROM roles WHERE title= "Sales Lead"), 9);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Ringo", "Starr", (SELECT role_id FROM roles WHERE title= "Accounting Clerk"), NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Robert", "Plant", (SELECT role_id FROM roles WHERE title= "Accounting Clerk"), NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("George", "Harrison", (SELECT role_id FROM roles WHERE title= "Accounting Lead"), NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Mick", "Jagger", (SELECT role_id FROM roles WHERE title= "Engineer One"), 10);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Keith", "Richards", (SELECT role_id FROM roles WHERE title= "Engineer Two"), 10);

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Manager", 16000, (SELECT department_id FROM departments WHERE dept_name= "Sales"));

INSERT INTO roles (title, salary, department_id)
VALUES ("Engineer Manager", 18000, (SELECT department_id FROM departments WHERE dept_name= "Engineering"));
