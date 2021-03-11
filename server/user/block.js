const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");

router.post("/", isUserAuth, (req, res) => {
  const id = req.userId;
  const username = req.body.username;
  const sqlInsert = "SELECT * FROM users WHERE username = ?";
  db.query(sqlInsert, username, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      db.query(
        "select * from block where blocker = ? and blocked = ?",
        [id, result[0].id],
        (err, rslt) => {
          if (err) {
            res.send({ err: err });
          } else if (rslt.length === 0) {
            db.query(
              "select * from likes where liker = ? and liked = ?",
              [id, result[0].id],
              (err, rslt) => {
                if (err) {
                  res.send({ err: err });
                } else if (rslt.length === 1) {
                  db.query("delete FROM likes WHERE liker = ? and liked = ?", [
                    id,
                    result[0].id,
                  ]);
                }
                if (result[0].rating > 0) {
                  const rating = result[0].rating - 0.1;
                  db.query("UPDATE users SET rating = ? WHERE username = ?", [
                    rating,
                    username,
                  ]);
                }
                db.query(
                  "select * from matchedusers where firstuser = ? and lastuser = ? or firstuser = ? and lastuser = ?",
                  [id, result[0].id, result[0].id, id],
                  (err, rsl) => {
                    if (err) {
                      res.send({ err: err });
                    } else if (rsl.length > 0) {
                      db.query(
                        "delete from matchedusers where firstuser = ? and lastuser = ? or firstuser = ? and lastuser = ?",
                        [id, result[0].id, result[0].id, id]
                      );
                    }
                  }
                );
                db.query(
                  "select * from `chat` where `from` = ? and `to` = ? or `from` = ? and `to` = ?",
                  [id, result[0].id,result[0].id,id],(err, rsl)=>{
                    if (err) {
                      res.send({ err: err });
                    } else if (rsl.length > 0) {
                      db.query(
                        "delete from chat where `from` = ? and `to` = ? or `from` = ? and `to` = ?",
                        [id, result[0].id,result[0].id,id])
                        
                    }
                  }
                );
                db.query("insert into block (blocker, blocked) values (?, ?)", [
                  id,
                  result[0].id,
                ]);
                res.send("apdated");
              }
            );
          } else if (rslt.length === 1) {
            db.query("delete FROM block WHERE blocker = ? and blocked = ?", [
              id,
              result[0].id,
            ]);
          }
        }
      );
    }
  });
});

module.exports = router;
