const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/",(req, res) => {
    const id = req.userId;
    const sqlDelete = "SELECT COUNT(*) as sub FROM users";
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
