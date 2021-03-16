const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");

router.get("/:profilename", isUserAuth, (req, res) => {
  const id = req.userId;
  const username = req.params.profilename;
  const sqlInsert = "SELECT * FROM users WHERE username = ?";
  db.query(sqlInsert, username, (err, rslt) => {
    if (err) {
      res.send({ err: err });
    } else if (!rslt.length) {
      // console.log("no user found");
    } else {
      // console.log(rslt);
      const sqlInsert = "SELECT * FROM reports WHERE reporter = ? and reported = ?";
      db.query(sqlInsert, [id, rslt[0].id], (err, result) => {
        if (err) {
          res.send({ err: err });
        } else if (result.length > 0) {
          res.send("found");
          // console.log(result);
        }
      });
    }
  });
});

module.exports = router;
