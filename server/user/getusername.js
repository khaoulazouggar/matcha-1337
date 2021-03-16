const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");

router.get("/", isUserAuth, (req, res) => {
  const id = req.userId;
  const sqlInsert = "SELECT username FROM `users` WHERE id = ?";
  db.query(sqlInsert, id, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else if (!result.length) {
      // console.log("no user found");
    } else if (result.length > 0) {
      res.send(result[0].username);
    }
  });
});

module.exports = router;
