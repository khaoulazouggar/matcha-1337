const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");
const { response } = require("express");

router.post("/", isUserAuth, (req, res) => {
  const id = req.userId;
  const username = req.body.username;
  const sqlInsert = "SELECT * FROM users WHERE username = ?";
  db.query(sqlInsert, username, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    // console.log(result[0].liked)
    else {
 
      //add likes
      db.query(
        "select * from likes where liker = ? and liked = ?",
        [id, result[0].id],
        (err, rslt) => {
          if (err) {
            res.send({ err: err });
          } else if (rslt.length === 0) {
            db.query(
              "select * from likes where liker = ? and liked = ?",
              [result[0].id, id],
              (err, resp) => {
                if (err) {
                  res.send({ err: err });
                } else if (resp.length === 0) {
                  console.log("not matched");
                } else if (resp.length > 0) {
                  console.log("matched");
                  db.query(
                    "insert into matchedusers (firstuser,lastuser) values(?,?)",
                    [id, result[0].id]
                  );
                }
              })
            db.query(
              "select * from reports where reporter = ? and reported = ?",
              [id, result[0].id],
              (err, rslt) => {
                if (err) {
                  res.send({ err: err });
                } else if (rslt.length === 1) {
                  db.query(
                    "select * from block where blocker = ? and blocked = ?",
                    [id, result[0].id],
                    (err, rslt) => {
                      if (err) {
                        res.send({ err: err });
                      } else if (rslt.length === 0) {
                        db.query(
                          "delete FROM reports WHERE reporter = ? and reported = ?",
                          [id, result[0].id]
                        );
                      }
                    }
                  );
                }
                db.query(
                  "select * from block where blocker = ? and blocked = ?",
                  [id, result[0].id],
                  (err, rslt) => {
                    if (err) {
                      res.send({ err: err });
                    } else if (rslt.length === 0) {
                      const rating = result[0].rating + 0.1;
                      db.query(
                        "UPDATE users SET rating = ? WHERE username = ?",
                        [rating, username]
                      );
                      db.query(
                        "insert into likes (liker, liked) values (?, ?)",
                        [id, result[0].id]
                      );
                      res.send("apdated");
                    }
                  }
                );
              }
            );
          } 
          else if (rslt.length === 1) {
            if (result[0].rating > 0) {
              const Norating = result[0].rating - 0.1;
              db.query("UPDATE users SET rating = ? WHERE username = ?", [
                Norating,
                username,
              ]);
            }
            db.query(
              "select * from matchedusers where firstuser = ? and lastuser = ? or firstuser = ? and lastuser = ?",
              [id, result[0].id,result[0].id,id],(err, rsl)=>{
                if (err) {
                  res.send({ err: err });
                } else if (rsl.length > 0) {
                  db.query(
                    "delete from matchedusers where firstuser = ? and lastuser = ? or firstuser = ? and lastuser = ?",
                    [id, result[0].id,result[0].id,id])                    
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
            db.query("delete FROM likes WHERE liker = ? and liked = ?", [
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
