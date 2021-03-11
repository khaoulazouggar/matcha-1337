const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const from = req.body.msgfrom;
  const to = req.body.msgto;
  const content = req.body.msgcontent;
  const time = req.body.msgtime;
  const to_username = req.body.to_username
  const sqlmatched = "SELECT * FROM `matchedusers` WHERE `firstuser` = ? AND `lastuser` = ? OR `firstuser` = ? AND `lastuser` = ?";
  db.query(sqlmatched, [from, to, to, from], (err, result) => {
      if (result?.length > 0)
      {
        const sqlInsert = "INSERT INTO chat(`from`, `to`, `content`, `msgtime`, `vu`, to_username) VALUES (?,?,?,?,0,?);";
        db.query(sqlInsert, [from, to, content, time, to_username], (err, result) => {
          if (err)
          {
            res.send({err : err})
          }
          if (result)
          {
            res.send({sendMsg : 'done'})
          }
        });
      }
      else
      {
        res.send({sendMsg : 'reload'})
      }
  });
});

module.exports = router;