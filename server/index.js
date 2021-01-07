const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
var nodemailer = require("nodemailer");

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

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log(err);
    }
    const sqlInsert = "INSERT INTO users(firstname,lastname,username,email,password) VALUES (?,?,?,?,?);";
    db.query(sqlInsert, [firstname, lastname, username, email, hash], (err, result) => {
      var mailOptions = {
        from: "caramel1337l@gmail.com",
        to: email,
        subject: "Confirm account",
        html: `<html><body><p>Welcome to Matcha,<br /><br/><br/><p>To activate your account please click <a href="http://localhost/matcha/confirm/?token=${tzdvs}">Here</a></p></p><p>
        <br />--------------------------------------------------------<br />This is an automatic mail , please do not reply.</p></body></html>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent");
        }
      });
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
      bcrypt.compare(password, result[0].password, (error, result) => {
        if (result) {
          res.send(result);
        } else {
          res.send({ message: "Wrong combination!" });
        }
      });
    } else {
      res.send({ message: "User Dosen't exist " });
    }
  });
});

app.listen(3001, () => {
  console.log("hello server");
});
