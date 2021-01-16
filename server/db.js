const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "passw@rD123",
  database: "matcha",
});
module.exports = db;
