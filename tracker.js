const mysql = require("mysql");
const inquirer = require("inquirer");
const figlet = require("figlet");
const cTable = require("console.table")
const util = require("util");
const dotenv = require('dotenv').config();
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASS,
    database: "tracker_DB"
});



init();
function init() {
    connection.connect(function (err) {
        if (err) throw err;
        figlet('Employee Tracker', function (err, text) {
            if (err) {
                console.log('something went wrong...');
                console.dir(err);
                return;
            }
            console.log(text);
            promptUser();
        });
    });
}

async function promptUser() {
    inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Employees",
                    value: "VIEW_ALL_EMPLOYEES"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ALL_ROLES"
                },
                {
                    name: "View All Departments",
                    value: "VIEW_ALL_DEPARTMENTS"
                },
                {
                    name: "Add An Employee",
                    value: "ADD_AN_EMPLOYEE"
                },
                {
                    name: "Add a role",
                    value: "Add_A_ROLE"
                },
                {
                    name: "Add a Dept",
                    value: "ADD_A_DEPT"
                }
            ]
        }
    ]).then(function (answer) {
        {
            switch (answer.action) {
                case "VIEW_ALL_EMPLOYEES":
                    return viewAllEmployeesAsync();
                case "VIEW_ALL_ROLES":
                    return viewAllRolesAsync();
                case "VIEW_ALL_DEPARTMENTS":
                    return viewAllDepartmentsAsync();
                case "ADD_AN_EMPLOYEE":
                    return addAnEmpAsync();
                case "ADD_A_ROLE":
                    return addARoleAsync();
                case "ADD_A_DEPT":
                    return addADeptAsync();
                default:
                    return quit();
            }
        }
    })
}

async function viewAllEmployeesAsync() {
    const sql = "SELECT * FROM tracker_DB.employee"
    const employees = await connection.query(sql, function (err, res) {
        if (err) throw err;
        console.table(res);
        promptUser();
    });
}

async function viewAllDepartmentsAsync() {
    const sql = "SELECT * FROM tracker_DB.department"
    const departments = await connection.query(sql, function (err, res) {
        if (err) throw err;
        console.table(res);
        promptUser();
    });
}

async function addADeptAsync() {
    inquirer
        .prompt({
            type: "Input",
            message: "Please input the [NAME] of the department: ",
            name: "name"
        }).then(function (answer) {
            const newDept = answer.name;
            connection.query("INSERT INTO department SET ?",
                {
                    name: newDept
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " departments added! \n")
                    promptUser();
                })
        });
}

async function addAnEmpAsync() {
    inquirer
        .prompt([
            {
                type: "Input",
                message: "What is the first name of the employee?: ",
                name: "first_name"
            },
            {
                type: "Input",
                message: "What is the last name of the employee?: ",
                name: "last_name"
            },
            {
                type: "Input",
                message: "What is the role ID of the employee?: ",
                name: "role_id"
            },
            {
                type: "Input",
                message: "What is the manager ID of the employee?: ",
                name: "manager_id"
            }
        ]).then(function (answer) {

            connection.query("INSERT INTO employee SET ?",
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role_id,
                    manager_id: answer.manager_id
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " employee added! \n")
                    promptUser();
                })
        });
}
async function quit() {
    return;
}
