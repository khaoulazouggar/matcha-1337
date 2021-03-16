const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const isPassword = require("../tools/isPassword");
const db = require("../db");
const bcrypt = require("bcrypt");

router.post("/", isUserAuth, (req, res) => {
  const { Opassword, Npassword } = req.body;
  const id = req.userId;
  const sqlInsert = "SELECT * FROM users WHERE id = ?";

  if (Opassword && Npassword && isPassword(Npassword)) {
    db.query(sqlInsert, id, (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        bcrypt.compare(Opassword, result[0].password, (error, rslt) => {
          if (rslt) {
            bcrypt.hash(Npassword, 10, (err, hash) => {
              db.query("UPDATE users SET password = ? WHERE id = ?", [hash, id]);
              res.send("modified");
              // console.log("modified");
            });
          } else {
            res.send("inccorect password");
            // console.log("inccorect password");
          }
        });
      }
    });
  } else res.send("error");
  //   console.log(req.body);
});
module.exports = router;
