const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const isPassword = require("../tools/isPassword");
const isUsername = require("../tools/isUsername");

router.post("/", (req, res) => {
  const { username, password } = req.body;
  if ((username, password, isUsername(username), isPassword(password))) {
    const sqlInsert = "SELECT * FROM users WHERE username = ?";
    db.query(sqlInsert, username, (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        //console.log(result)
        bcrypt.compare(password, result[0].password, (error, rslt) => {
          // console.log(result[0].confirm)
          if (rslt) {
            if (result[0].confirm === 1) res.send(rslt);
            else {
              res.send({ message: "Please check your email" });
            }
          } else {
            // console.log(1)
            res.send({ message: "Wrong combination!" });
          }
        });
      } else {
        // console.log(2)
        res.send({ message: "User Dosen't exist" });
      }
    });
  } else {
    res.send("error");
  }
});

module.exports = router;
