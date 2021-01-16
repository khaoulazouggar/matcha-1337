const express = require("express");
const router = express.Router();
const Email = require("../email");
const bcrypt = require("bcrypt");
const isEmail = require("../tools/isEmail");
const isName = require("../tools/isName");
const isPassword = require("../tools/isPassword");
const isUsername = require("../tools/isUsername");
const db = require("../db");

router.post("/", (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;
  if (
    (firstname,
    lastname,
    username,
    email,
    password,
    isName(firstname),
    isName(lastname),
    isUsername(username),
    isEmail(email),
    isPassword(password))
  ) {
    require("crypto").randomBytes(48, function (err, buffer) {
      var token = buffer.toString("hex");
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.log(err);
        }
        db.query("SELECT COUNT(*) AS count FROM `users` WHERE `username` = ? OR `email` = ? LIMIT 1;", [username, email], (error, rslt) => {
          console.log(rslt[0].count);

          if (err) {
            console.log(err);
          } else if (rslt[0].count > 0) res.send({ message: "Email and or username are already used" });
          else
            db.query(
              "INSERT INTO users(firstname,lastname,username,email,password,token) VALUES (?,?,?,?,?,?);",
              [firstname, lastname, username, email, hash, token],
              (err, result) => {
                if (Email(token, email)) {
                  res.send({ message: "done" });
                  console.log("Email sent");
                }
                
              }
            );
        });
      });
    });
  } else res.send("error");
});
module.exports = router;
