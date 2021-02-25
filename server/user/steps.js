const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");
const multer = require("multer");
const http = require("http");
const path = require("path");
const upload = multer({
  dest: "images"

});
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

router.post("/", isUserAuth, (req, res) => {
  const id = req.userId;
  const { yourGender, genderLooking, birthday, notes, tags, img } = req.body;

  if (
    db.query("UPDATE users SET gender = ?, genderLooking = ?, birthday= ?, bio= ?,tags= ? WHERE id = ?", [
      yourGender,
      genderLooking,
      birthday,
      notes,
      JSON.stringify(tags),
      id,
    ])
  ) {
    console.log("done");
    res.send("done");
  } else console.log("error");
  //   console.log(JSON.stringify(tags))
  //   console.log("-------------------------")
  //   console.log(req.body)
});
module.exports = router;
