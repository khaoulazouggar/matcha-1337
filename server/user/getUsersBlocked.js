const express = require("express");
const router = express.Router();
const db = require("../db");
const isUserAuth = require("./isUserAuth");

router.get("/",isUserAuth,(req, res) => {
    const id = req.userId;
    const sqlDelete = "SELECT * FROM users INNER JOIN block ON users.id = block.blocked WHERE block.blocker = ?";
    db.query(sqlDelete, id,(err, rows) => {
      if (err) {
        res.send({ err: err });
      }
      if (rows.length > 0) {
        res.send(rows);
      }
    });
  });
  module.exports = router;
