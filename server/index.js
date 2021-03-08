const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const register = require("./user/register");
const login = require("./user/login");
const isUserAuth = require("./user/isUserAuth");
const confirm = require("./user/confirm");
const fgpass = require("./user/fgpass");
const changepass = require("./user/changepass");
const token = require("./user/token");
const tokenpass = require("./user/tokenpass");
const steps = require("./user/steps");
const editProfile = require("./user/editProfile");
const editPassword = require("./user/editPassword");
const editInfo = require("./user/editInfo");
const editLocation = require("./user/editLocation");
const getData = require("./user/getData");
const getDataByUser = require("./user/getDataByUser");
const getIdByUser = require("./user/getIdByUser");
const getImages = require("./user/getImages");
const editGallery = require("./user/editGallery");
const removeimage = require("./user/removeimage");
const defaultimage = require("./user/defaultimage");
const removeProfilePic = require("./user/removeProfilePic");
const like = require("./user/like");
const getlike = require("./user/getlikes");
const report = require("./user/report");
const getreport = require("./user/getreports");
const block = require("./user/block");
const getblock = require("./user/getblock");
const getusername = require("./user/getusername");
const getposition = require("./user/getposition");

app.use(cors());
// app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use("/images", express.static("./images"));
app.use("/register", register);
app.use("/login", login);
app.use("/confirm", confirm);
app.use("/fgpass", fgpass);
app.use("/changepass", changepass);
app.use("/token", token);
app.use("/tokenpass", tokenpass);
app.use("/steps", steps);
app.use("/editProfile", editProfile);
app.use("/editPassword", editPassword);
app.use("/edit", editInfo);
app.use("/editLocation", editLocation);
app.use("/getData", getData);
app.use("/getDataByUser", getDataByUser);
app.use("/getIdByUser", getIdByUser);
app.use("/getImages", getImages);
app.use("/isUserAuth", isUserAuth);
app.use("/editGallery", editGallery);
app.use("/removeimage", removeimage);
app.use("/defaultimage", defaultimage);
app.use("/removeProfilePic", removeProfilePic);
app.use("/like", like);
app.use("/getLike", getlike);
app.use("/report", report);
app.use("/getReport", getreport);
app.use("/block", block);
app.use("/getBlock", getblock);
app.use("/getusername", getusername);
app.use("/getposition", getposition);

app.listen(3001, () => {
  console.log("hello server");
});
