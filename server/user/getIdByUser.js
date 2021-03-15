const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");

router.get("/:profilename", isUserAuth, (req, res) => {
  const username = req.params.profilename;
  const id = req.userId;
  const d = new Date();

  const sqlInsert = "SELECT id FROM `users` WHERE username = ?";
  db.query(sqlInsert, username, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result) {
      if (result.length > 0) {
        if (result[0].id === id) res.send("user logged");
        else {
          res.send("not the user logged");
          db.query(
            "select * from block where blocker = ? and blocked = ?",
            [id, result[0].id],
            (err, rslt) => {
              if (err) {
                res.send({ err: err });
              } else if (rslt.length === 0) {
                db.query("Insert into history (watcher, watched,date) values(? , ?, ?)", [id, result[0].id, d], (err, rows) => {
                  if (err) {
                    res.send({ err: err });
                  } else{
                    db.query("INSERT INTO `notification` (`from`, `to`, `subject`, `time`) values(? , ?, 'viewed your profile', ?)", [id, result[0].id, d], (err, result) => {
                      if (err) {
                        res.send({ err: err });
                      } else{
                      }
                    })
                  }
                })
              }})
        }
      }
    } else res.send("no user found");
  });
});

module.exports = router;
