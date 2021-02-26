import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTransgender } from "@fortawesome/free-solid-svg-icons";
import { faTransgenderAlt } from "@fortawesome/free-solid-svg-icons";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { faBiohazard } from "@fortawesome/free-solid-svg-icons";
import { faBirthdayCake } from "@fortawesome/free-solid-svg-icons";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { TextField } from "@material-ui/core";
import moment from "moment";
import Swal from "sweetalert2";

function EditProfile(props) {
  const history = useHistory();
  const handelEditProfile = () => {
    let gender = props.data.gender;
    let tags = props.data1.tags;
    let notes = props.data2.notes;
    axios
      .post(
        "http://localhost:3001/editProfile",
        {
          ...gender,
          tags,
          notes,
        },
        { headers: { "x-auth-token": localStorage.getItem("token") } }
      )
      .then((res) => {
        if (res.data === "U failed to authenticate" || res.data === "we need a token") {
          localStorage.removeItem("token");
          history.push("/login");
        } else {
          if (res.data === "nothing changed") {
            Swal.fire({ icon: "error", text: "Nothing Changed", showConfirmButton: false ,heightAuto: false});
          }else if (res.data === "updated") {
            Swal.fire({ icon: "success", text: "Your profile has been successfully modified.", showConfirmButton: false ,heightAuto: false});}
          // console.log(res.data);
        }
      });
  };

  const getdata = () => {
    axios.get("http://localhost:3001/getData", { headers: { "x-auth-token": localStorage.getItem("token") } }).then((res) => {
      if (res.data === "U failed to authenticate" || res.data === "we need a token") {
        localStorage.removeItem("token");
        history.push("/login");
      } else {
        // console.log(res.data);
        let data = props.data.gender;
        data.yourGender = res.data[0].gender;
        data.genderLooking = res.data[0].genderLooking;
        data.birthday = moment(res.data[0].birthday).format("YYYY-MM-DD");
        props.data.setGender({ ...data });
        props.data2.setNotes(res.data[0].bio);
        if (res.data[0].tags) props.data1.setTags(JSON.parse(res.data[0].tags));
        
      }
    });
  };

  useEffect(() => {
    getdata(); // eslint-disable-next-line
  }, []);

  const handleChange = (newValue) => {
    if (newValue) props.data1.setTags([...newValue]);
    else props.data1.setTags([]);
    // console.log(props.data1);
  };
  return (
    <div className="rightE">
      <h1>Edit Account</h1>

      <div>
        <div className="In-edit">
          <div>
            <p>
              <FontAwesomeIcon icon={faTransgender} style={{ marginRight: "10px" }} />
              Your Gender :
            </p>
            <span className="gender">
              <button
                className="genre"
                style={{ backgroundColor: props.data.gender.yourGender === "male" ? "green" : "#5961f9ad" }}
                onClick={(e) => {
                  let data = props.data.gender;
                  data.yourGender = "male";
                  props.data.setGender({ ...data });
                }}
              >
                male
              </button>
              <button
                className="genre"
                style={{ backgroundColor: props.data.gender.yourGender === "female" ? "green" : "#5961f9ad" }}
                onClick={() => {
                  let data = props.data.gender;
                  data.yourGender = "female";
                  props.data.setGender({ ...data });
                }}
              >
                female
              </button>
            </span>
            <p>
              <FontAwesomeIcon icon={faTransgenderAlt} style={{ marginRight: "10px" }} />
              Looking for :
            </p>
            <span className="gender">
              <button
                className="genre"
                style={{ backgroundColor: props.data.gender.genderLooking === "male" ? "green" : "#5961f9ad" }}
                onClick={() => {
                  let data = props.data.gender;
                  data.genderLooking = "male";
                  props.data.setGender({ ...data });
                }}
              >
                male
              </button>
              <button
                className="genre"
                style={{ backgroundColor: props.data.gender.genderLooking === "female" ? "green" : "#5961f9ad" }}
                onClick={() => {
                  let data = props.data.gender;
                  data.genderLooking = "female";
                  props.data.setGender({ ...data });
                }}
              >
                female
              </button>
              <button
                className="genre"
                style={{ backgroundColor: props.data.gender.genderLooking === "both" ? "green" : "#5961f9ad" }}
                onClick={() => {
                  let data = props.data.gender;
                  data.genderLooking = "both";
                  props.data.setGender({ ...data });
                }}
              >
                both
              </button>
            </span>
            <p>
              <FontAwesomeIcon icon={faBirthdayCake} style={{ marginRight: "10px" }} />
              Your birthday :
            </p>
            <span>
              <form noValidate>
                <TextField
                  id="date"
                  type="date"
                  InputProps={{ inputProps: { min: "1900-05-01", max: "2020-02-14" } }}
                  // value={props.data.gender.birthday}
                  value={props.data.gender.birthday ? props.data.gender.birthday : ""}
                  onChange={(e) => {
                    // console.log(e.target.value);
                    let data = props.data.gender;
                    data.birthday = e.target.value;
                    props.data.setGender({ ...data });
                  }}
                  InputLabelProps={{
                    shrink: false,
                  }}
                />
              </form>
            </span>
          </div>
          <div style={{ marginLeft: "15px" }}>
            <p>
              <FontAwesomeIcon icon={faBiohazard} style={{ marginRight: "10px" }} />
              Change Your Bio :
            </p>
            <textarea
              maxLength="100"
              className="edit-bio"
              type="text"
              placeholder="Change Your Bio"
              value={props.data2.notes}
              onChange={(e) => props.data2.setNotes(e.target.value)}
            />
            <div className="edit-tags">
              <p>
                <FontAwesomeIcon icon={faTags} style={{ marginRight: "10px" }} />
                Change Your Tags ...
              </p>
              <CreatableSelect isMulti isClearable value={props.data1.tags} onChange={handleChange} />
            </div>
          </div>
        </div>
        <br />
        <br />
        <div style={{ marginRight: "15px" }}>
          <button className="btn" onClick={() => handelEditProfile()}>
            Edit
          </button>
        </div>
        <br />
      </div>
    </div>
  );
}

export default EditProfile;
