const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");
const fs = require("fs");

router.post("/", isUserAuth, (req, res) => {
  console.log(req.body);
  const auto = req.body.auto;
  const image = req.body.image;
  const folder = "./images/";
  const sqlInsert = "DELETE FROM images WHERE auto = ?";
  db.query(sqlInsert, auto, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
        fs.unlinkSync(folder + image);
    //   res.send(result);
    //   console.log(result);
      console.log("done");
    }
  });
});

module.exports = router;
