const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
    const username = req.body.username;
    const lastseen = req.body.newdate;
    console.log(lastseen);
    const sqlDelete = "UPDATE `users` SET `last_connection` = ? WHERE `username` = ?";
    db.query(sqlDelete, [lastseen, username], (err, rows) => {
      if (err) {
        res.send({ err: true });
      }
      if (rows) {
        res.send({status: true});
      }
    });
  });
  module.exports = router;
