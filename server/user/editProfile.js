const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");

router.post("/", isUserAuth, (req, res) => {
    console.log("enter");
    const id = req.userId;
    const sqlInsert = "SELECT * FROM users WHERE id = ?";
    const {yourGender, genderLooking, birthday, tags, notes } = req.body;
    db.query(sqlInsert, id, (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) { 
          db.query("UPDATE users SET gender = ?, genderLooking = ?, birthday= ?, bio= ?, tags= ? WHERE id = ?", [
            yourGender,
            genderLooking,
            birthday,
            notes,
            JSON.stringify(tags),
            id,
          ]);
          res.send("updated");
          console.log("updated;");
      }
    });
    console.log(req.body);
  });
module.exports = router;