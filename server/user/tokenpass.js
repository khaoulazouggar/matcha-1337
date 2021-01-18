const express = require("express")
const router = express.Router()
const db = require("../db")

router.post("/", (req, res) => {
    const token = req.body.token;
    const sqlInsert = "SELECT * FROM users WHERE token = ?";
    db.query(sqlInsert, token, (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length === 0) {
        res.send({ message: "token not found" });
      } else res.send({ message: "token found" });
    });
  });

  module.exports = router;