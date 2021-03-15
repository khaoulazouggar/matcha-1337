const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");
const moment =require("moment");

router.post("/", isUserAuth, (req, res) => {
  const id = req.userId;
  const sqlInsert = "SELECT * FROM users WHERE id = ?";
  const { yourGender, genderLooking, birthday, tags, notes } = req.body;
  db.query(sqlInsert, id, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      if (
        result[0].gender === yourGender &&
        result[0].genderLooking === genderLooking &&
        moment(result[0].birthday).format("YYYY-MM-DD") === birthday &&
        result[0].bio === notes &&
        result[0].tags === JSON.stringify(tags)
      ) {
        res.send("nothing changed");
        console.log("nothing changed");
      } else if(JSON.stringify(tags).length + result[0].tags.length > 300 || result[0].bio.length + notes.length > 100){
        // console.log(JSON.stringify(tags).length + result[0].tags.length);
        // console.log(result[0].bio.length + notes.length);
        // console.log("data too long")
        res.send("data too long");
      }
        else if(birthday >= "2010-12-31") {
          res.send("Please enter a valid birthday")

        }
       else {
        db.query(
          "UPDATE users SET gender = ?, genderLooking = ?, birthday= ?,bio= ?, tags= ? WHERE id = ?",
          [yourGender, genderLooking, birthday,notes, JSON.stringify(tags), id]
        );
        res.send("updated");
        console.log("updated");
      }
    }
  });
  // console.log(req.body);
});
module.exports = router;
