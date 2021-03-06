const mysql = require("mysql");

const db = mysql.createConnection({
  host: "192.168.99.154",
  user: "root",
  password: "root",
  database: "matcha",
});
module.exports = db;
