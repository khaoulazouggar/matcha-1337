const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");
const multer = require("multer");
// const http = require("http");
// const path = require("path");
// const upload = multer({
//   dest: "images",
// });
// const handleError = (err, res) => {
//     res
//       .status(500)
//       .contentType("text/plain")
//       .end("Oops! Something went wrong!");
//   };

// router.post(
//     "/",
//     upload.single("file"),
//     (req, res) => {
//       const tempPath = req.file.path;
//       const targetPath = path.join(__dirname, "./uploads/image.png");

//       if (path.extname(req.file.originalname).toLowerCase() === ".png") {
//         fs.rename(tempPath, targetPath, err => {
//           if (err) return handleError(err, res);

//           res
//             .status(200)
//             .contentType("text/plain")
//             .end("File uploaded!");
//         });
//       } else {
//         fs.unlink(tempPath, err => {
//           if (err) return handleError(err, res);

//           res
//             .status(403)
//             .contentType("text/plain")
//             .end("Only .png files are allowed!");
//         });
//       }
//     }
//   );

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/gif"
  )
    cb(null, true);
  else cb(null, false);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter,
});

function calcAge(dateString) {
  var birthday = +new Date(dateString);
  return ~~((Date.now() - birthday) / (31557600000));
}

router.post("/", isUserAuth, upload.single("filename"), (req, res) => {
  const id = req.userId;
  const { yourGender, genderLooking, birthday, notes, tags, img } = req.body;

  if (
    db.query(
      "UPDATE users SET gender = ?, genderLooking = ?, birthday= ?, age=? ,bio= ?, tags= ? WHERE id = ?",
      [yourGender, genderLooking, birthday, calcAge(birthday), notes, JSON.stringify(tags), id]
    )
  ) {
    console.log("done");
    res.send("done");
  } else console.log("error");
});
module.exports = router;
