const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/",(req, res) => {
    const sqlCount = "SELECT COUNT(*) as matched FROM matchedusers";
    db.query(sqlCount ,(err, rows) => {
      if (err) {
        res.send({ err: err });
      }
      if (rows.length > 0) {
        res.send(rows);
      }
    });
  });
  module.exports = router;
