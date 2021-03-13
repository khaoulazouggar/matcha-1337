const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");

router.get("/", isUserAuth, (req, res) => {
    const id = req.userId;
    const sqlSelect = "SELECT * FROM `notification` WHERE `to` = ?";
        db.query(sqlSelect, id, (err, rows) => {
          if (err) {
            res.send({ err: err });
          }
          if (rows?.length > 0) {
            res.send(rows);
          }
        });
  });
  module.exports = router;
