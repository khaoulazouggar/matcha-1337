const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");
const fs = require("fs");
const md5 = require("md5");
const jimp = require("jimp");

saveOneImage = (image, folder, i) => {
  return new Promise((resolve, reject) => {
    const imgName = md5(new Date().getTime() + i) + ".jpg";
    const imgDest = `${folder}/${imgName}`;
    const base64Data = image ? image.replace(/^data:image\/\w+;base64,/, "") : "";
    const buffer = Buffer.from(base64Data, "base64");
    // console.log(buffer);
    jimp.read(buffer, (err, rslt) => {
      if (err) {
        reject();
      } else {
        // console.log("rslt");
        fs.writeFile(imgDest, base64Data, "base64", function (err) {
          if (err) {
            // console.log(err);

            reject("error_1");
          } else {
            // console.log("xdf");
            resolve(imgName);
          }
        });
      }
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
        .catch((err) => reject(err))
    );
  });
};

router.post("/", isUserAuth, (req, res) => {
  const { yourGender, genderLooking, birthday, notes, tags, img, profileImg, latitude, longitude, city } = req.body;
  // console.log(req.body);
  // console.log(req.body.img);

  if (img?.length <= 5 && img?.length !== 0 && yourGender && genderLooking && birthday && notes && tags?.length) {
    if (birthday <= "1920-12-31" || birthday >= "2010-12-31") return res.send("Please enter a valid birthday");
    if (JSON.stringify(tags)?.length > 250 || notes?.length > 100) {
      // console.log(JSON.stringify(tags)?.length);
      // console.log(notes?.length);
      // console.log("hnaaaa");
      return res.send("data too long");
    } else {
      const id = req.userId;

      saveImages(img, id)
        .then((resl) => {
          resl.map((i) => {
            db.query("INSERT INTO images (image, id) VALUES (?,?)", [i, id]);
          });

          db.query(
            "UPDATE users SET gender = ?, genderLooking = ?, birthday= ?,bio= ?, tags= ?, profilePic =?,latitude = ?,longitude= ? , city = ? WHERE id = ?",
            [
              yourGender,
              genderLooking,
              birthday,
              notes,
              JSON.stringify(tags),
              resl[profileImg],
              latitude,
              longitude,
              city,
              id,
            ],
            (err, rslt) => {
              if (err) {
                res.send("incorrect information in bio");
              } else {
                res.send("done");
              }
            }
          );
        })
        .catch((err) => {
          res.end();
        });
    }
  } else {
    return res.send("You have to complete all the steps first!");
  }
});
module.exports = router;
