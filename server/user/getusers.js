const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");

router.get("/", isUserAuth, (req, res) => {
    const id = req.userId;
    const sqlInsert = "SELECT * FROM users";
    db.query(sqlInsert, id, (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      }
    });
  });

  module.exports = router;
