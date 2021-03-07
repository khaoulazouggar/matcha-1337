const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");

router.get("/:profilename", isUserAuth, (req, res) => {
  const username = req.params.profilename;
  const sqlInsert ="SELECT firstname,lastname,username,rating,city,tags,gender,genderLooking,birthday,bio,profilePic,users.id, images.id, image, latitude, longitude FROM `images` right join `users` on users.id = images.id WHERE users.username = ?"
  db.query(sqlInsert, username, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else if (result.length > 0) {
      res.send(result);
      // console.log(result);
    } else if (!result.length) console.log("no user found");
  });
});

module.exports = router;