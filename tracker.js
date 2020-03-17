const mysql = require("mysql");
const inquirer = require("inquirer");
const figlet = require("figlet");
const conTable = require("console.table")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "iNotlNN4",
    database: "tracker_DB"
});

init();

async function init() {
    connection.connect();
    //displayFiglet();
    await promptUser();
    console.log('hello')
}

async function displayFiglet() {
    await figlet('Employee Tracker', function (err, text) {
        if (err) {
            console.log('something went wrong...');
            console.dir(err);
            return;
        }
        console.log(text);
    });
}
async function promptUser() {
    inquirer
        .prompt([
            {
                name: "action",
                type: "list",
                message: "What would you like to do?",
                choices: ["View all employees"]
            }
        ])
        .then(answers => {
            console.log(answers.action);
            //viewAllEmployees();
        })
        .catch(error => {
            if (error.isTtyError) { }
            else { }
        });
}

function viewAllEmployees() {
    connection.query("SELECT * FROM tracker_DB.employee", function (err, results) {
        if (err) throw err;
        console.log(results)
    })
}

function addEmployee() {
    connection.query("SELECT * FROM tracker_DB.employee"), function (err, results) {
        add();
    }
}