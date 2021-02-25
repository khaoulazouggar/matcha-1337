const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isPassword = require("../tools/isPassword");
const isUsername = require("../tools/isUsername");
const jwt_secret = "this is a jsonwebtoken secret";

// const verifyJWT = (req, res) =>{
// const token = req.headers["Authorization"]
// if (!token)
// res.send("we need a token")
// else{
// jwt.verify(token, jwt_secret,(err, decoded)=> {
//   if(err){
//     res.send({auth: false, message: "U failed to authenticate"})
//   }else{
//     req.userId= decoded.id;
//     next();
//   }
// })
// }
// }

router.post("/", (req, res) => {
  const { username, password } = req.body;
  if ((username, password, isUsername(username), isPassword(password))) {
    const sqlInsert = "SELECT * FROM users WHERE username = ?";
    db.query(sqlInsert, username, (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        //console.log(result)
        bcrypt.compare(password, result[0].password, (error, rslt) => {
          // console.log(result[0].confirm)
          if (rslt) {
            if (result[0].confirm === 1) {
              const id = result[0].id;
              let token = jwt.sign({id}, jwt_secret);
              res.send({token: token});
            } else {
              res.send({ message: "Please check your email" });
            }
          } else {
            // console.log(1)
            res.send({ message: "Wrong combination!" });
          }
        });
      } else {
        // console.log(2)
        res.send({ message: "User Dosen't exist" });
      }
    });
  } else {
    res.send({ message: "error" });
  }
});

module.exports = router;
