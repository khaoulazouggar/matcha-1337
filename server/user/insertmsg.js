const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const from = req.body.msgfrom;
  const to = req.body.msgto;
  const content = req.body.msgcontent;
  console.log(content);
  const sqlInsert = "INSERT INTO chat(`from`, `to`, `content`) VALUES (?,?,?);";
  db.query(sqlInsert, [from, to, content], (err, result) => {
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