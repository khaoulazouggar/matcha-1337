const mysql = require("mysql");

const db = mysql.createConnection({
  host: "192.168.99.101",
  user: "root",
  password: "root",
  database: "matcha",
});
module.exports = db;
