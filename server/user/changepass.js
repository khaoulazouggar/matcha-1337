const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const isPassword = require("../tools/isPassword");

router.post("/", (req, res) => {
  const token = req.body.token;
  const password = req.body.password;
  if ((password, isPassword(password))) {
    bcrypt.hash(password, 10, (err, hash) => {
      const sqlInsert = "SELECT * FROM users WHERE tokenPass = ?";
      db.query(sqlInsert, token, (err, result) => {
        if (err) {
          res.send({ err: err });
        }
        if (result.length > 0) {
          db.query("UPDATE users SET password = ? WHERE tokenPass = ?", [hash, token]);
          db.query("UPDATE users SET tokenPass = NULL WHERE tokenPass = ?", [token]);
          res.send({ message: "modified" });
        } else res.send({ message: "error" });
      });
    });
  } else{
    res.send("error");
  }
});

module.exports = router;
