const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
    const id = req.body.id;
    const sqlSelect = "DELETE FROM `notification` WHERE id = ?";
        db.query(sqlSelect, id, (err, rows) => {
          if (err) {
            res.send({ err: true });
          }
          if (rows) {
            res.send({status: true});
          }
        });
  });
  module.exports = router;