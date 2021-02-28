const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");
const fs = require("fs");
const md5 = require("md5");

saveImage = (image, folder, i) => {
  return new Promise((resolve, reject) => {
    const imgName = md5(new Date().getTime() + i) + ".jpg";
    const imgDest = `${folder}/${imgName}`;
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    fs.writeFile(imgDest, base64Data, "base64", function (err) {
      if (err) reject("fgfgfgfgfgf");
      else resolve(imgName);
    });
  });
};
saveImagess = (images, id) => {
  return new Promise((resolve, reject) => {
    const folder = "./images";
    if (!fs.existsSync(folder)) fs.mkdirSync(folder);
    var imgTab = [];
    images.forEach((img, i, arr) =>
      saveImage(img, folder, i)
        .then((res) => {
          imgTab = [...imgTab, res];
          if (imgTab.length === images.length) resolve(imgTab);
        })
        .catch((err) => reject(err))
    );
  });
};

router.post("/", isUserAuth, (req, res) => {
  const id = req.userId;
  const { Img, img } = req.body;
  console.log(img.length + "-------------------" + Img.length);
  // Img.map((i) => {
  //   console.log(Img[0].image);
  // });
  // console.log(img);

  const sqlInsert = "SELECT count(image) as total FROM images WHERE id = ?";
  db.query(sqlInsert, id, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      if (result[0].total === Img.length && img.length === 0) {
        res.send("nothing changed");
        console.log("nothing changed");
      } else if (img.length + Img.length > 5) {
        res.send("more than 5");
        console.log("more than 5");
      } else {
        if (img.length) {
          saveImagess(img, id).then((rslt) => {
            rslt.map((i) => {
              // console.log(rslt);
              // console.log("---------------" + i + "--------------");
              db.query("INSERT INTO images (image, id) VALUES (?,?)", [i, id]);
              console.log("updated");
            });
            res.send("updated");
          });
        }
      }
    }
  });
});
module.exports = router;
