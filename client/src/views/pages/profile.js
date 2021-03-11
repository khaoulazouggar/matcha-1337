import React, { useState, useEffect } from "react";
import "../../css/profile.css";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import { useHistory } from "react-router-dom";
import noUser from "../../photos/noUser.png";
import moment from "moment";
import CreatableSelect from "react-select/creatable";
import FavoriteIcon from "@material-ui/icons/Favorite";
import BlockIcon from "@material-ui/icons/Block";
import FlagRoundedIcon from "@material-ui/icons/FlagRounded";
import { useParams } from "react-router-dom";
import MapWithAMarker from "../../Components/googleMap";
import  socketIOClient  from "socket.io-client";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Moment from 'react-moment';

function Profile(props) {
  const [username, setusername] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [ProfileImg, setProfileImg] = useState([noUser]);
  const [tags, setTags] = useState([]);
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState("");
  const [city, setCity] = useState("");
  const [like, setLike] = useState("#5961f9ad");
  const [report, setReport] = useState("#5961f9ad");
  const [block, setBlock] = useState("#5961f9ad");
  const [userlogged, setUserlogged] = useState(0);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [profile, setprofile] = useState(0);
  const [done, setdone] = useState(0);
  const [online, setOnline] = useState(false);
  const [lastconnection, setlastConnection] = useState("")
  const [gender, setGender] = useState({
    yourGender: "",
    genderLooking: "",
    birthday: "",
  });
  const [Img, setImg] = useState([]);
  const { profilename } = useParams();
  const history = useHistory();

  function calcAge(dateString) {
    var birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / 31557600000);
  }

  useEffect(() => {
    return new Promise((resolve, reject) => {
      let unmount = false;
      axios
        .get("http://localhost:3001/getposition", {
          headers: { "x-auth-token": localStorage.getItem("token") },
        })
        .then((res) => {
          if (!unmount) {
            if (
              res.data === "U failed to authenticate" ||
              res.data === "we need a token"
            ) {
              localStorage.removeItem("token");
              history.push("/login");
            } else {
              if (!res?.data[0]?.latitude) {
                history.push("/steps");
                // console.log(res);
              } else {
                setdone(1);
              }
            }
          }
        });
      return () => {
        unmount = true;
      };
    }); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const getInfos = () => {
    let unmount = false;
    if (done) {
      if (profilename) {
        axios
          .get(`http://localhost:3001/getIdByUser/${profilename}`, {
            headers: { "x-auth-token": localStorage.getItem("token") },
          })
          .then((res) => {
            if (!unmount) {
              if (
                res.data === "U failed to authenticate" ||
                res.data === "we need a token"
              ) {
                localStorage.removeItem("token");
                history.push("/login");
              } else if (res.data === "user logged") {
                setUserlogged(1);
              }
            }
          });
        axios
          .get(`http://localhost:3001/getDataByUser/${profilename}`, {
            headers: { "x-auth-token": localStorage.getItem("token") },
          })
          .then((res) => {
            if (!unmount) {
              if (
                res.data === "U failed to authenticate" ||
                res.data === "we need a token"
              ) {
                localStorage.removeItem("token");
                history.push("/login");
              } else if (res.data === "no user found") history.push("/");
              else {
                // setprofile(1);
                // console.log(res.data);
                setfirstname(res.data[0].firstname);
                setlastname(res.data[0].lastname);
                setusername(res.data[0].username);
                setRating(res.data[0].rating);
                setCity(res.data[0].city);
                setlastConnection(res.data[0]?.last_connection)
                if (res.data[0].tags) setTags(JSON.parse(res.data[0].tags));
                gender.birthday = moment(res.data[0].birthday).format(
                  "YYYY-MM-DD"
                );
                gender.yourGender = res.data[0].gender;
                gender.genderLooking = res.data[0].genderLooking;
                setGender({ ...gender });
                center.lat = res.data[0].latitude;
                center.lng = res.data[0].longitude;
                setCenter({ ...center });
                setNotes(res.data[0].bio);
                if (res.data[0].profilePic)
                  setProfileImg(
                    "http://localhost:3001/images/" + res.data[0].profilePic
                  );
                if (res.data[0].image) setImg(res.data);
              }
            }
          });
        axios
          .get(
            `http://localhost:3001/getLike/${profilename}`,

            { headers: { "x-auth-token": localStorage.getItem("token") } }
          )
          .then((res) => {
            if (!unmount) {
              if (
                res.data === "U failed to authenticate" ||
                res.data === "we need a token"
              ) {
                localStorage.removeItem("token");
                history.push("/login");
              } else if (res.data === "found") {
                setLike("#ec1212cc");
                // console.log(res.data);
              }
            }
          });
        axios
          .get(
            `http://localhost:3001/getReport/${profilename}`,

            { headers: { "x-auth-token": localStorage.getItem("token") } }
          )
          .then((res) => {
            if (!unmount) {
              if (
                res.data === "U failed to authenticate" ||
                res.data === "we need a token"
              ) {
                localStorage.removeItem("token");
                history.push("/login");
              } else if (res.data === "found") {
                setReport("#e8bb11");
                // console.log(res.data);
              }
            }
          });
        axios
          .get(
            `http://localhost:3001/getBlock/${profilename}`,

            { headers: { "x-auth-token": localStorage.getItem("token") } }
          )
          .then((res) => {
            if (!unmount) {
              if (
                res.data === "U failed to authenticate" ||
                res.data === "we need a token"
              ) {
                localStorage.removeItem("token");
                history.push("/login");
              } else if (res.data === "found") {
                setBlock("#ec1212cc");
                history.push("/error")
                // console.log(res.data);
              }else if (res.data === "not found"){
                setprofile(1);
              }
            }
          });
      }
    }

    return () => {
      unmount = true;
    };
  }
  setTimeout(getInfos,  500);
    return (
          clearTimeout()
      )
    // eslint-disable-next-line
  }, [history, profilename, done]);
  // console.log(tags[0].value);
  const handelLike = () => {
    if (like === "#5961f9ad" && report === "#e8bb11" && block === "#ec1212cc") {
      setLike("#5961f9ad");
    } else if (like === "#5961f9ad" && report === "#e8bb11") {
      setLike("#ec1212cc");
      setReport("#5961f9ad");
    } else if (like === "#5961f9ad" && block === "#ec1212cc")
      setLike("#5961f9ad");
    else if (like === "#5961f9ad") setLike("#ec1212cc");
    else setLike("#5961f9ad");
    axios
      .post(
        "http://localhost:3001/like",
        { username },
        { headers: { "x-auth-token": localStorage.getItem("token") } }
      )
      .then((res) => {
        if (
          res.data === "U failed to authenticate" ||
          res.data === "we need a token"
        ) {
          localStorage.removeItem("token");
          history.push("/login");
        } else {
          console.log(res.data);
        }
      });
  };
  const handelBlock = () => {
    if (like === "#ec1212cc" && block === "#5961f9ad") {
      setBlock("#ec1212cc");
      setLike("#5961f9ad");
    } else if (block === "#5961f9ad") setBlock("#ec1212cc");
    else setBlock("#5961f9ad");
    axios
      .post(
        "http://localhost:3001/block",
        { username },
        { headers: { "x-auth-token": localStorage.getItem("token") } }
      )
      .then((res) => {
        if (
          res.data === "U failed to authenticate" ||
          res.data === "we need a token"
        ) {
          localStorage.removeItem("token");
          history.push("/login");
        } else {
          console.log(res.data);
          //add it or not ???????
          window.location.href = "/error";
        }
      });
  };
  const handelReport = () => {
    if (report === "#5961f9ad" && like === "#ec1212cc") {
      setReport("#e8bb11");
      setLike("#5961f9ad");
    } else if (report === "#5961f9ad") setReport("#e8bb11");
    else setReport("#5961f9ad");
    axios
      .post(
        "http://localhost:3001/report",
        { username },
        { headers: { "x-auth-token": localStorage.getItem("token") } }
      )
      .then((res) => {
        if (
          res.data === "U failed to authenticate" ||
          res.data === "we need a token"
        ) {
          localStorage.removeItem("token");
          history.push("/login");
        } else {
          console.log(res.data);
        }
      });
  };

  // #ec1212cc red
  // #5961f9ad purple
  // #e8bb11 yellow
  const URL = "http://localhost:3001";
  const socket = socketIOClient(URL);
  socket.emit('stateOfuser', profilename)
  socket.on('online', function(data)
  {
    if (data === profilename)
    {
      setOnline(true);
    }
    else
    {
    }
  })
  socket.on('offline', function(name){
  if (name?.usr === profilename)
  {
    setOnline(false)
    setlastConnection(name?.lastseen);
    axios.post('http://localhost:3001/updateLastseen', {username : profilename , newdate: new Date()})
        .then((response) => {
            if (response.data.status === true)
            {
                
            }
            else
            {
                console.log(response.data.err);
            }
        });
  }
  else{
  }
})
  if (!firstname) return <div> </div>;
  return (
    <div className="profile">
      <div className="p1">
        <div className="top">
          <div className="pic">
            <img
              className="Inpic"
              src={ProfileImg}
              alt={ProfileImg}
              key={ProfileImg}
            />
          </div>
          <br />
          <div style={{  display:"flex"}}><FiberManualRecordIcon className={online === true ? 'online' : 'offline'}></FiberManualRecordIcon>{
          online === true ? 'online' : 
          <Moment className='lastmg' fromNow>{online === false ? lastconnection : ''}</Moment>
          }
          </div>
          <br />
          <Rating
            name="half-rating-read"
            value={parseFloat(rating)}
            precision={0.5}
            readOnly
          />
          <br />
          <br />
          <div className="icons" style={{ display: userlogged ? "none" : "" }}>
            <span className="icon" onClick={() => handelLike()}>
              <FavoriteIcon style={{ color: like, fontSize: "40px" }} />
            </span>
            <span className="icon" onClick={() => handelBlock()}>
              <BlockIcon style={{ color: block, fontSize: "40px" }} />
            </span>
            <span className="icon" onClick={() => handelReport()}>
              <FlagRoundedIcon style={{ color: report, fontSize: "40px" }} />
            </span>
          </div>
          <p className="title">{username}</p>
        </div>
        <div className="info">
          <h3 className="profileH3">Information :</h3>
          <div>
            <div className="in">
              <span className="inf">Age :</span> {calcAge(gender.birthday)}
            </div>
            <br />
            <div className="in">
              <span className="inf">firstname :</span> {firstname}
            </div>
            <br />
            <div className="in">
              <span className="inf">lastname :</span> {lastname}
            </div>
            <br />
            <div className="in">
              <span className="inf">Gender :</span> {gender.yourGender}
            </div>
            <br />
            <div className="in">
              <span className="inf">Looking for :</span> {gender.genderLooking}
            </div>
            <br />
            <div className="in">
              <span className="inf">City :</span> {city}
            </div>
          </div>
        </div>
      </div>
      <div className="p2">
        <div className="bioghraphie">
          <div className="b1">
            <h3 className="profileH3">Bioghraphie :</h3>
            <span>{notes}</span>
          </div>
          <div className="b2">
            <h3 className="profileH3">Tags : </h3>
            <span>
              <CreatableSelect isMulti isClearable isDisabled value={tags} />
            </span>
          </div>
        </div>
        <div className="stickers">
          <h3 className="profileH3">Localisation : </h3>
          {profile === 1 ? (
            <MapWithAMarker
              data={{ center, setCenter }}
              // containerElement={<div style={{ height: `400px` }} />}
              // mapElement={<div style={{ height: `100%` }} />}
              // center={center}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="p3">
        <div>
          <h3 className="profileH3">Gallery :</h3>
          <div className="album">
            {Img.map((p, i) => (
              <div
                style={{ width: "227px", height: "227px" }}
                className="test"
                key={i}
              >
                <img
                  className="gallery-img"
                  src={"http://localhost:3001/images/" + p.image}
                  alt={p}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
