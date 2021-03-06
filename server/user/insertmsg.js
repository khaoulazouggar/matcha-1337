const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const from = req.body.msgfrom;
  const to = req.body.msgto;
  const content = req.body.msgcontent;
  const time = req.body.msgtime;
  const sqlInsert = "INSERT INTO chat(`from`, `to`, `content`, `msgtime`, `vu`) VALUES (?,?,?,?,0);";
  db.query(sqlInsert, [from, to, content, time], (err, result) => {
    if (err)
    {
      res.send({err : err})
    }
    if (result)
    {
      res.send({sendMsg : 'done'})
    }
  });
});

module.exports = router;