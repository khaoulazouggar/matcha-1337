const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
    const from = req.body.firstuser;
    const to = req.body.lastuser;
    const sqlSelect = "SELECT * FROM chat WHERE (chat.from = ? AND chat.to = ? OR chat.from = ? AND chat.to = ?)";
    db.query(sqlSelect, [from, to, to, from], (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length >= 0) {
        const sqlUpdate = "UPDATE chat SET `vu` = 1 WHERE `to` = ? AND `from` = ? ORDER BY chat_id DESC LIMIT 1";
        db.query(sqlUpdate, [from, to],(err, result) => {
        });
          res.send(result);
      }
    });
  });

  module.exports = router;