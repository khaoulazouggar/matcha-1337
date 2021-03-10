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
const getposition = require("./user/getposition");
const ussocket = require("./user/socket");
const unblockUser = require("./user/unblockUsers");
const subscribers = require("./user/subscribers");
const getusersBlocked = require("./user/getUsersBlocked");
const getusers = require("./user/getusers");
const insertmsg = require("./user/insertmsg");
const updateLastseen = require("./user/updateLastSeen");
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
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
io.on("connection", function(socket)  {

    socket.on('userconnected', function(username){
      var usr = username
      if (usr)
      {
        client.set(username, socket.id);
        socket.broadcast.emit('online', usr);
      }
          socket.on('disconnect', () => {
          if (usr)
          {
            client.del(usr);
          }
          var data = {usr : usr, lastseen : new Date()}
          socket.broadcast.emit('offline', data);
      });
  });
  socket.on('stateOfuser', function(profile_name){
      client.get(profile_name, function(err, reply) {
        if (reply !== null)
        {
          socket.broadcast.emit('online', profile_name);
        }
        else
        {
          // socket.broadcast.emit('makaynch', profile_name)
        }
      });
  });
    socket.on('send_message', function(data){
    client.get(data?.to_username, function(err, reply) {
      if (reply !== null)
      {
          socket.broadcast.emit('new_message', data);
          socket.broadcast.emit('notification_message', data);
      }
      else
      {
        
      }
    })
  })
})

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use("/images", express.static("./images"));
app.use("/register", register);
app.use("/getusername", getusername);
app.use("/getmatcheduser", getmatchedusr);
app.use("/updateLastseen", updateLastseen);
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
app.use("/tokenpass", tokenpass);
app.use("/getusers", getusers);
app.use("/changepass", changepass);
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

server.listen(3001, () => {
  console.log("hello server");
});
