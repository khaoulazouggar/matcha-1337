const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");

router.get("/", isUserAuth, (req, res) => {
    const id = req.userId;
    const sqlInsert = "SELECT * FROM users INNER JOIN matchedusers ON (users.id = matchedusers.firstuser OR users.id = matchedusers.lastuser) WHERE (matchedusers.firstuser = ? OR matchedusers.lastuser = ?) AND users.id != ?"
    db.query(sqlInsert, [id, id, id],(err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      }
    });
  });

  module.exports = router;