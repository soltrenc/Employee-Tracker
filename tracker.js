const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "tracker_DB"
});

connection.connect(function (err) {
    if (err) throw err;;
});