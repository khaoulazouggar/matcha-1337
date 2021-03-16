const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");

router.get("/", isUserAuth, (req, res) => {
  const id = req.userId;
  const sqlgender = "SELECT genderLooking FROM users WHERE id = ?";
  db.query(sqlgender, id, (err, rows) => {
    if (rows[0].genderLooking === "both") {
      const sqlSelect =
        "SELECT * FROM `users` WHERE users.id  NOT IN (SELECT users.id from users left join block on (users.id = block.blocked OR users.id = block.blocker) WHERE (block.blocker = ? or block.blocked = ?)) AND profilePic != 'NULL' AND users.id <> ?";
      db.query(sqlSelect, [id, id, id], (err, rows) => {
        if (err) {
          res.send({ err: err });
        }
        if (rows.length > 0) {
          res.send(rows);
        }
      });
    } else {
      const sqlSelect =
        "SELECT * FROM `users` WHERE users.id  NOT IN (SELECT users.id from users left join block on (users.id = block.blocked OR users.id = block.blocker) WHERE (block.blocker = ? or block.blocked = ?)) AND profilePic != 'NULL' AND gender = ? AND users.id <> ?";
      db.query(sqlSelect, [id, id, rows[0].genderLooking, id], (err, rows) => {
        if (err) {
          res.send({ err: err });
        }
        if (rows.length > 0) {
          res.send(rows);
        }
      });
    }
  });
});

module.exports = router;
