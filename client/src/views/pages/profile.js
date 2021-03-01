import React, { useState, useEffect } from "react";
import "../../css/profile.css";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import { useHistory } from "react-router-dom";
import noUser from "../../photos/noUser.png";
import moment from "moment";
import CreatableSelect from "react-select/creatable";


function Profile() {
  const [username, setusername] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [ProfileImg, setProfileImg] = useState([noUser]);
  const [tags, setTags] = useState([]);
  const [notes, setNotes] = useState("");
  const [gender, setGender] = useState({ yourGender: "", genderLooking: "", birthday: "" });
  const [Img, setImg] = useState([]);


  function calcAge(dateString) {
    var birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / 31557600000);
  }

  const history = useHistory();
  useEffect(() => {
    axios
      .get("http://localhost:3001/getData", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then((res) => {
        if (res.data === "U failed to authenticate" || res.data === "we need a token") {
          localStorage.removeItem("token");
          history.push("/login");
        } else {
          console.log(res.data);
          setfirstname(res.data[0].firstname);
          setlastname(res.data[0].lastname);
          setusername(res.data[0].username);
          if (res.data[0].tags) setTags(JSON.parse(res.data[0].tags));
          gender.birthday = moment(res.data[0].birthday).format("YYYY-MM-DD");
          gender.yourGender = res.data[0].gender;
          gender.genderLooking = res.data[0].genderLooking;
          setGender({ ...gender });
          setNotes(res.data[0].bio);
          if (res.data[0].profilePic)
            setProfileImg("http://localhost:3001/images/" + res.data[0].profilePic);
        }
      });
      axios
      .get("http://localhost:3001/getImages", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then((res) => {
        if (res.data === "U failed to authenticate" || res.data === "we need a token") {
          localStorage.removeItem("token");
          history.push("/login");
        } else {
          setImg(res.data);
          // console.log(res.data);
        }
      });// eslint-disable-next-line
  }, [history]);
  // console.log(tags[0].value);

  return (
    <div className="profile">
      <div className="p1">
        <div className="top">
          <div className="pic">
            <img className="Inpic" src={ProfileImg} alt={ProfileImg} key={ProfileImg} />
          </div>
          <br />
          <br />
          <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
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
              <span className="inf">Location :</span> khouribga
            </div>
          </div>
        </div>
      </div>
      <div className="p2">
        <div className="bioghraphie">
          <h3 className="profileH3">Bioghraphie :</h3>
          <span>{notes}</span>
          <h3 className="profileH3">Tags : </h3>
          <span><CreatableSelect isMulti isClearable isDisabled value={tags} /></span>
        </div>
        <div className="stickers">
          <h3 className="profileH3">Map : </h3>
          <span></span>
        </div>
      </div>
      <div className="p3">
        <div>
          <h3 className="profileH3">Gallery :</h3>
          <div className= "album">
          {Img.map((p, i) => (
            <div style={{ width: "227px", height: "227px" }} className="test" key={i}>
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
