const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const cors = require("cors");
const register = require("./user/register");
const login = require("./user/login");
const isUserAuth = require("./user/isUserAuth");
const confirm = require("./user/confirm");
const fgpass = require("./user/fgpass");
const changepass = require("./user/changepass");
const token = require("./user/token");
const steps = require("./user/steps");
const editProfile = require("./user/editProfile");
const editPassword = require("./user/editPassword");
const editInfo = require("./user/editInfo");
const getData = require("./user/getData");

app.use(cors());
// app.use(express.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use("/register", register);
app.use("/login", login);
app.use("/confirm", confirm);
app.use("/fgpass", fgpass);
app.use("/changepass", changepass);
app.use("/token", token);
app.use("/steps", steps);
app.use("/editProfile", editProfile);
app.use("/editPassword", editPassword);
app.use("/edit", editInfo);
app.use("/getData", getData);
app.use("/isUserAuth", isUserAuth);

app.listen(3001, () => {
  console.log("hello server");
});
