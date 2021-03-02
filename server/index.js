const express = require("express");
const app = express();
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
const chat = require("./user/chat");
const ussocket = require("./user/socket");
const unblockUser = require("./user/unblockUsers");
const subscribers = require("./user/subscribers");
const getusersBlocked = require("./user/getUsersBlocked");
const getusers = require("./user/getusers");
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: "*",
    }
});
io.on("connection", (socket) => {
    console.log("new users connected");
})

app.use(cors());
app.use(express.json());
app.use("/register", register);
app.use("/subscribers", subscribers);
app.use("/ussocket", ussocket);
app.use("/unblock", unblockUser);
app.use("/getusersblocked", getusersBlocked);
app.use("/login", login);
app.use("/confirm", confirm);
app.use("/fgpass", fgpass);
app.use("/chat", chat);
app.use("/token", token);
app.use("/getusers", getusers);
app.use("/changepass", changepass);
app.use("/steps", steps);
app.use("/editProfile", editProfile);
app.use("/editPassword", editPassword);
app.use("/edit", editInfo);
app.use("/getData", getData);
app.use("/isUserAuth", isUserAuth);

server.listen(3001, () => {
  console.log("hello server");
});
