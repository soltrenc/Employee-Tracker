DROP DATABASE IF EXISTS tracker_db;
CREATE database tracker_db;

USE tracker_db;

CREATE TABLE department (
  id INT NOT NULL,
  PRIMARY KEY (id),
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL,
  PRIMARY KEY (id),
  name VARCHAR(30) NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT NOT NULL
);

CREATE TABLE employee (
  id INT NOT NULL,
  PRIMARY KEY (id),
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT
);
