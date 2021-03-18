const data = require("./data.json");
const db = require("./db");

for (let i = 0; i < data.length; i++) {
  db.query("INSERT INTO `users` set ?", [data[i]], (err, res) => {
    if (err) console.log(err);
  });
}
