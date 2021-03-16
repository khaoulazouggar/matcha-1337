const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");
const isEmail = require("../tools/isEmail");
const isName = require("../tools/isName");
const isUsername = require("../tools/isUsername");

router.post("/", isUserAuth, (req, res) => {
  const id = req.userId;
  const sqlInsert = "SELECT * FROM users WHERE id = ?";
  const { Nfirstname, Nlastname, Nusername, Nemail } = req.body;
  db.query(sqlInsert, id, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      if (result[0].firstname === Nfirstname && result[0].lastname === Nlastname && result[0].username === Nusername && result[0].email === Nemail) {
        res.send("nothing changed");
        // console.log("nothing changed");
      } else if ((isName(Nfirstname), isName(Nlastname), isUsername(Nusername), isEmail(Nemail))) {
        db.query("SELECT COUNT(*) AS count FROM `users` WHERE `username` = ? and username != ? LIMIT 1;", [Nusername, result[0].username], (error, rslt) => {
          // console.log(rslt[0].count);
          if (err) {
            // console.log(err);
          } else if (rslt[0].count > 0) res.send("username is already used");
          else {
            db.query("SELECT COUNT(*) AS count FROM `users` WHERE `email` = ? and email != ?LIMIT 1;", [Nemail, result[0].email], (error, rslt) => {
              // console.log(rslt[0].count);
              if (err) {
                // console.log(err);
              } else if (rslt[0].count > 0) res.send("email is already used");
              else {
                db.query("UPDATE users SET firstname = ?, lastname = ?, username= ?, email= ? WHERE id = ?", [Nfirstname, Nlastname, Nusername, Nemail, id]);
                res.send("updated");
                // console.log("updated;");
              }
            });
          }
        });
      } else {
        res.send("error");
      }
    }
  });
  // console.log(req.body);
});

// router.get("/", isUserAuth, (req, res) => {
//   const id = req.userId;
//   const sqlInsert = "SELECT * FROM users WHERE id = ?";
//   db.query(sqlInsert, id, (err, result) => {
//     if (err) {
//       res.send({ err: err });
//     }
//     if (result.length > 0) {
//       res.send(result);
//       console.log(result);
//     }
//   });
// });
module.exports = router;
