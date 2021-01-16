const express = require("express");
const router = express.Router();
const db = require("../db");
const isEmail = require("../tools/isEmail");
const send_Email = require("../send_Email");

router.post("/", (req, res) => {
  require("crypto").randomBytes(48, function (err, buffer) {
    var token = buffer.toString("hex");
    const email = req.body.email;
    if ((email, isEmail(email))) {
      const sqlInsert = "SELECT * FROM users WHERE email = ?";
      db.query(sqlInsert, email, (err, result) => {
        if (err) {
          res.send({ err: err });
        }
        if (result.length > 0) {
          db.query("UPDATE users SET tokenPass = ? WHERE email = ?", [token, email]);

          if (
            send_Email(
              email,
              "Reset password",
              `<p>To recover your account please click <a href="http://localhost:3000/changepass/${token}">Here</a></p>`
            )
          )
            res.send({ message: "done" });
          console.log("Email sent");
        } else {
          res.send("email not found");
        }
      });
    } else res.send("error");
  });
});

module.exports = router;
