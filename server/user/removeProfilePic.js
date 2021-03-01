const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");
const fs = require("fs");

router.post("/", isUserAuth, (req, res) => {
  //   console.log(req.body);
  const id = req.userId;
  const image = req.body.Img;
  const e = req.body.e;
  console.log(image[e].image);
const profilePic = image[e].image
  const sqlInsert = "UPDATE users SET profilePic = NULL WHERE id = ?";
  db.query(sqlInsert, id, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send("done");
      console.log("done");
    }
  });
});

module.exports = router;