const mysql = require("mysql");
try {
  const db = mysql.createConnection({
    host: "192.168.99.155",
    user: "root",
    password: "root",
    database: "matcha",
  });
  module.exports = db;
} catch (error) {
  // console.log(error)
}
