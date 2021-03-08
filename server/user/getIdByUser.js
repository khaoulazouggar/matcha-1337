const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");

router.get("/:profilename", isUserAuth, (req, res) => {
  const username = req.params.profilename;
  const id = req.userId;
  const sqlInsert = "SELECT id FROM `users` WHERE username = ?";
  db.query(sqlInsert, username, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result) {
      if (result.length > 0) {
        if (result[0].id === id) res.send("user logged");
        else res.send("not the user logged");
      }
    } else res.send("no user found");
  });
});

module.exports = router;
