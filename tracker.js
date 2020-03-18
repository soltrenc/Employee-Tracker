const mysql = require("mysql");
const { prompt } = require("inquirer");
const figlet = require("figlet");
const conTable = require("console.table")
const util = require("util");
require('dotenv').config();
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_pass,
    database: "tracker_DB"
});

init();
function init() {
    figlet('Employee Tracker', function (err, text) {
        if (err) {
            console.log('something went wrong...');
            console.dir(err);
            return;
        }
        console.log(text);
        promptUser();
    });

}
async function promptUser() {
    const { action } = await prompt([
        {
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Employees",
                    value: "VIEW_ALL_EMPLOYEES"
                },
            ]
        }
    ])
    switch (action) {
        case "VIEW_EMPLOYEES":
            return viewAllEmployeesAsync();
        default:
            return quit();
    }
}

async function viewAllEmployeesAsync() {
    connection.query = util.promisify(connection.query);
    const employees = await connection.query("SELECT * FROM tracker_DB.employee");
    console.log('employees', employees);
    promptUser();
}

function addEmployee() {
    connection.query("SELECT * FROM tracker_DB.employee"), function (err, results) {
        add();
    };
    promptUser();
}
async function quit() {
    return;
}