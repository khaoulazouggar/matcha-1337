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
const ussocket = require("./user/socket");
const unblockUser = require("./user/unblockUsers");
const subscribers = require("./user/subscribers");
const getusersBlocked = require("./user/getUsersBlocked");
const getusers = require("./user/getusers");
const insertmsg = require("./user/insertmsg");
const getmatchedusr = require("./user/getmacheduser");
const getmsg = require("./user/getmsg");
const getusername = require("./user/getusername");
const redis = require("redis");
const client = redis.createClient({ detect_buffers: true });
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "https://localhost:3000",
    methods: ["GET", "POST"]
  }
});
io.on("connection", function(socket)  {

    socket.on('userconnected', function(username){
      var usr = username
      // console.log(usr)
      if (usr)
      {
        client.set(username, socket.id);
      }
          socket.on('disconnect', () => {
          console.log('user disconnected');
          if (usr)
          {
            client.del(usr);
          }
      });
  });
    socket.on('send_message', function(data){
    client.get(data?.to_username, function(err, reply) {
      if (reply !== null)
      {
          socket.broadcast.emit('new_message', data)
          console.log(data)
      }
      else
      {
        console.log('mcha');
      }
    })
  })
})

app.use(cors());
app.use(express.json());
app.use("/register", register);
app.use("/getusername", getusername);
app.use("/getmatcheduser", getmatchedusr);
app.use("/getmsg", getmsg);
app.use("/insertmsg", insertmsg);
app.use("/subscribers", subscribers);
app.use("/ussocket", ussocket);
app.use("/unblock", unblockUser);
app.use("/getusersblocked", getusersBlocked);
app.use("/login", login);
app.use("/confirm", confirm);
app.use("/fgpass", fgpass);
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
