DROP DATABASE IF EXISTS staff_DB;
CREATE database staff_DB;

USE staff_DB;

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT, 
  dept_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (department_id)
);

CREATE TABLE roles (
  role_id INT NOT NULL AUTO_INCREMENT, 
  title VARCHAR(30) NOT NULL,
  salary DECIMAL default 0,
  PRIMARY KEY (role_id),
  FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

CREATE TABLE employees (
  employee_id INT NOT NULL AUTO_INCREMENT, 
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (employee_id),
  FOREIGN KEY (role_id) REFERENCES roles(role_id),
  FOREIGN KEY (manager_id) REFERENCES roles(manager_id) DEFAULT NULL
);