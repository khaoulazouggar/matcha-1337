const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");

router.get("/", isUserAuth, (req, res) => {
  const id = req.userId;
  const sqlInsert =
    "SELECT username,profilePic,date from users u INNER JOIN history h ON u.id = h.watched  WHERE h.watcher = ? ORDER BY date DESC";
  db.query(sqlInsert, id, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result?.length > 0) {
      res.send(result);
      // console.log(result);
    }
  });
});

module.exports = router;
