const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");
const fs = require("fs")
const md5 = require("md5")

saveOneImage = (image, folder, i) => {
  return new Promise((resolve, reject) => {
    const imgName = md5(new Date().getTime() + i) + ".jpg";
    const imgDest = `${folder}/${imgName}`;
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    fs.writeFile(imgDest, base64Data, "base64", function (err) {
      if (err) reject("error_1");
      else resolve(imgName);
    });
  });
};
saveImages = (images, id) => {
return new Promise((resolve, reject) => {
  const folder = "./images";
  if (!fs.existsSync(folder)) fs.mkdirSync(folder);
  var imgTab = [];
  images.forEach((img, i, arr) =>
    saveOneImage(img, folder, i)
      .then((res) => {
        imgTab = [...imgTab, res];
        if (imgTab.length === images.length) resolve(imgTab);
      })
      .catch((err) => rejects(err))
  );
})
};

function calcAge(dateString) {
  var birthday = +new Date(dateString);
  return ~~((Date.now() - birthday) / (31557600000));
}

router.post("/", isUserAuth, (req, res) => {
  const { yourGender, genderLooking, birthday, notes, tags, img } = req.body;
  const id = req.userId;
  saveImages(img, id).then((res) => {
    // console.log(res);  
    res.map((i) => {
      db.query(
        "INSERT INTO images (image, id) VALUES (?,?)",[i, id]
      )
    })

  })
  if (
    (db.query(
      "UPDATE users SET gender = ?, genderLooking = ?, birthday= ?, age=? ,bio= ?, tags= ? WHERE id = ?",
      [yourGender, genderLooking, birthday, calcAge(birthday), notes, JSON.stringify(tags), id]
    )
    )
  ) {
    console.log("done");
    res.send("done");
  } else console.log("error");
});
module.exports = router;
