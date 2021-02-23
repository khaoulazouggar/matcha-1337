const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");
const isEmail = require("../tools/isEmail");
const isName = require("../tools/isName");
const isUsername = require("../tools/isUsername");

router.post("/", isUserAuth, (req, res) => {
  console.log("enter");
  const id = req.userId;
  const sqlInsert = "SELECT * FROM users WHERE id = ?";
  const { Nfirstname, Nlastname, Nusername, Nemail } = req.body;
  db.query(sqlInsert, id, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      if ((isName(Nfirstname), isName(Nlastname), isUsername(Nusername), isEmail(Nemail))) {
        db.query("UPDATE users SET firstname = ?, lastname = ?, username= ?, email= ? WHERE id = ?", [
          Nfirstname,
          Nlastname,
          Nusername,
          Nemail,
          id,
        ]);
        res.send("updated");
        console.log("updated;");
      } else {
        res.send("error");
      }
    }
  });
  console.log(req.body);
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
