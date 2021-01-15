const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
var nodemailer = require("nodemailer");
const { deepEqual } = require("assert");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "caramel1337l@gmail.com",
    pass: "khawla.1140",
  },
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "passw@rD123",
  database: "matcha",
});

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
  // console.log(req.body)
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  require("crypto").randomBytes(48, function (err, buffer) {
    var token = buffer.toString("hex");
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.log(err);
      }
      db.query("SELECT COUNT(*) AS count FROM `users` WHERE `username` = ? OR `email` = ? LIMIT 1;", [username, email], (error, rslt) => {
        console.log(rslt[0].count);

        if (err) {
          console.log(err);
        } else if (rslt[0].count > 0) res.send({ message: "Email and or username are already used" });
        else
          db.query(
            "INSERT INTO users(firstname,lastname,username,email,password,token) VALUES (?,?,?,?,?,?);",
            [firstname, lastname, username, email, hash, token],
            (err, result) => {
              var mailOptions = {
                from: "caramel1337l@gmail.com",
                to: email,
                subject: "Confirm account",
                html: `<html><body><p>Welcome to Matcha,<br /><br/><br/><p>To activate your account please click <a href="http://localhost:3000/confirm/${token}">Here</a></p></p><p>
          <br />--------------------------------------------------------<br />This is an automatic mail , please do not reply.</p></body></html>`,
              };
              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  res.send({ message: "done" });
                  console.log("Email sent");
                }
              });
            }
          );
      });

      // const sqlInsert = "INSERT INTO users(firstname,lastname,username,email,password,token) VALUES (?,?,?,?,?,?);";
      // db.query(sqlInsert, [firstname, lastname, username, email, hash, token], (err, result) => {
      //   var mailOptions = {
      //     from: "caramel1337l@gmail.com",
      //     to: email,
      //     subject: "Confirm account",
      //     html: `<html><body><p>Welcome to Matcha,<br /><br/><br/><p>To activate your account please click <a href="http://localhost:3000/confirm/${token}">Here</a></p></p><p>
      //   <br />--------------------------------------------------------<br />This is an automatic mail , please do not reply.</p></body></html>`,
      //   };
      //   transporter.sendMail(mailOptions, function (error, info) {
      //     if (error) {
      //       console.log(error);
      //     } else {
      //       res.send("DONE");
      //       console.log("Email sent");
      //     }
      //   });
      // });
    });
  });
});

app.post("/login", (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;

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
          if (result[0].confirm === 1) res.send(rslt);
          else {
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
});

app.post("/confirm", (req, res) => {
  const token = req.body.token;
  const sqlInsert = "SELECT * FROM users WHERE token = ?";
  db.query(sqlInsert, token, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      if (result[0].token === token) {
        db.query("UPDATE users SET confirm = 1 WHERE token = ?", token);
        res.send({ message: "Your account has been successfully verified." });
      } else res.send({ message: "token not found" });
    }
  });
});

app.post("/fgpass", (req, res) => {
  require("crypto").randomBytes(48, function (err, buffer) {
    var token = buffer.toString("hex");
  const email = req.body.email;
  const sqlInsert = "SELECT * FROM users WHERE email = ?";
  db.query(sqlInsert, email, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      db.query("UPDATE users SET tokenPass = ? WHERE email = ?",[token, email])
        var mailOptions = {
          from: "caramel1337l@gmail.com",
          to: email,
          subject: "Reset password",
          html: `<html><body><p>Welcome to Matcha,<br /><br/><br/><p>To recover your account please click <a href="http://localhost:3000/changepass/${token}">Here</a></p></p><p>
    <br />--------------------------------------------------------<br />This is an automatic mail , please do not reply.</p></body></html>`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            res.send({ message: "done" });
            console.log("Email sent");
          }
        });
      
    }
  });
});
});

app.post("/token", (req, res) => {
  const token = req.body.token;
  const sqlInsert = "SELECT * FROM users WHERE tokenPass = ?";
  db.query(sqlInsert, token, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length === 0) {
      res.send({ message: "token not found" });
    } else res.send({ message: "Done" });
  });
});

app.post("/changepass", (req, res) => { 
  const token = req.body.token;
  const password = req.body.password;
  bcrypt.hash(password, 10, (err, hash) => {
  const sqlInsert = "SELECT * FROM users WHERE tokenPass = ?";
  db.query(sqlInsert, token, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
        db.query("UPDATE users SET password = ? WHERE tokenPass = ?", [hash, token]);
        db.query("UPDATE users SET tokenPass = NULL WHERE tokenPass = ?", [token]);
        res.send({ message: "modified" });
    } else res.send({ message: "error" });
  });
  });
});
app.listen(3001, () => {
  console.log("hello server");
});
