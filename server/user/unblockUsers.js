const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
    const blocker = req.body.blocker;
    const blocked = req.body.blocked;
    const sqlDelete = "DELETE FROM block WHERE blocker = ? AND blocked = ?";
    db.query(sqlDelete, [blocker, blocked], (err, rows) => {
      if (err) {
        res.send({ err: true });
      }
      if (rows) {
        res.send({status: true});
      }
    });
  });
  module.exports = router;
