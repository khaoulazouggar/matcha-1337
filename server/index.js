const express = require('express')
const app = express()
const mysql = require('mysql')
// const bodyParser = require('body-parser')
const cors = require('cors')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "passw@rD123",
    database: "matcha"
})

app.use(cors());
app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.get("/", (req, res) => {
    console.log("sssdsss");
    res.send("fuck you")
})
app.post("/register", (req, res) => {
    console.log(req.body)
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    const sqlInsert = "INSERT INTO users(firstname,lastname,username,email,password) VALUES (?,?,?,?,?);"
    db.query(sqlInsert, [firstname, lastname, username, email, password], (err, result) => {
        console.log(err)
    })
})

app.post("/login", (req, res) => {
    console.log(req.body)
    const username = req.body.username
    const password = req.body.password

    const sqlInsert = "SELECT * FROM users WHERE username = ? AND password = ?"
    db.query(sqlInsert, [username, password], (err, result) => {
        if (err) { res.send({ err: err }); }
        if (result.length > 0) { res.send(result) }
        else { res.send({ message: "Wrong combination!" }) }
    })
})

app.listen(3001, () => {
    console.log("hello server");
})