const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "passw@rD123",
    database: "matcha"
})

app.use(cors);
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/api/insert", (req, res) => {
    const firstname = req.body.firstname
    const lastname = req.body.lastname

    const sqlInsert = "INSERT INTO users(firstname,lastname) VALUES (?,?);"
    db.query(sqlInsert, [firstname, lastname], (err, result) => {
        console.log(err)
    })
})

app.listen(3001, () => {
    console.log("hello server");
})