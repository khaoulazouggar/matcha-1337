const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");

router.post("/", isUserAuth,(req, res) =>{
    console.log(req.body)
})
module.exports = router;