const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");
const fs = require("fs");

router.post("/", isUserAuth, (req, res) => {
  const id = req.userId;
  const sqlInsert = "delete from block where (blocker = ? or blocked = ?)";
  db.query(sqlInsert, [id, id], (err, result) => {
    if (err) {
      res.send({ err: err });
    }else{
        db.query("delete from reports where (reporter = ? or reported = ?)",[id,id],(err, resul) => {
            if (err) {
                res.send({ err: err });
              }else{
                //   console.log(resul.length);
                  db.query("delete from likes where (liker = ? or liked = ?)",[id,id],(err, resu) => {
                    if (err) {
                        res.send({ err: err });
                      }else{
                        db.query("delete from matchedusers where (firstuser = ? or lastuser = ?)",[id,id],(err, resu) => {
                            if (err) {
                                res.send({ err: err });
                              }else{
                                db.query("delete from history where (watcher = ? or watched = ?)",[id,id],(err, resu) => {
                                    if (err) {
                                        res.send({ err: err });
                                      }else{
                                        db.query("delete from images where (id = ?)",[id],(err, resu) => {
                                            if (err) {
                                                res.send({ err: err });
                                              }else{
                                                db.query("delete from chat where (`from` = ? or `to` = ?)",[id,id],(err, resu) => {
                                                    if (err) {
                                                        res.send({ err: err });
                                                      }else{
                                                        db.query("delete from users where (id = ?)",[id],(err, resu) => {
                                                            if (err) {
                                                                res.send({ err: err });
                                                              }else{
                                                                  res.send("done")
                                                                  console.log(resu);
                                                              }
                                                        })
                                                      }
                                                })
                                              }
                                        })
                                      }
                                })
                              }
                        })
                      }
                  })
              }})
    }
  });
});

module.exports = router;
