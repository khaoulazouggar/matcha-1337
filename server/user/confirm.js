const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const token = req.body.token;
  const sqlInsert = "SELECT * FROM users WHERE token = ?";
  db.query(sqlInsert, token, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      if (result[0].token === token) {
        db.query("UPDATE users SET confirm = 1 WHERE token = ?", token);
        if (result[0].confirm === 1)
          db.query("UPDATE users SET token = NULL WHERE token = ?", [token]);
        res.send({ message: "Verified" });
      }
    } else res.send({ message: "token not found" });
  });
});

module.exports = router;
