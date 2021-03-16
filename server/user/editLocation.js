const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");
const axios = require("axios");

router.post("/", isUserAuth, (req, res) => {
  const { lat, lng } = req.body;
  const id = req.userId;
  const sqlInsert = "SELECT * FROM users WHERE id = ?";
  if (lat && lng) {
    db.query(sqlInsert, id, (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result) {
        if (result.length > 0) {
          if (result[0].latitude === lat && result[0].longitude === lng) {
            res.send("nothing changed");
            // console.log("nothing changed");
          } else {
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBWRRPwssHd-F_zgFZdR1X08BtQ5i1TVmY`).then((resl) => {
              if (resl) {
                const city = resl.data.plus_code.compound_code.substr(8);
                db.query("UPDATE users SET latitude = ?, longitude = ?, city = ? WHERE id = ?", [lat, lng, city, id]);
                res.send("modified");
                // console.log("modified");
                // console.log(resl.data.plus_code.compound_code.substr(8));
              }
            });
          }
        }
      }
    });
  } else res.send("error");
  //   console.log(req.body);
});
module.exports = router;
