import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTransgender } from "@fortawesome/free-solid-svg-icons";
import { faTransgenderAlt } from "@fortawesome/free-solid-svg-icons";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { faBiohazard } from "@fortawesome/free-solid-svg-icons";
import CreatableSelect from "react-select/creatable";
import axios from "axios";

function EditProfile(props) {

  const handelEditProfile = () =>{
    let gender = props.data.gender;
    let tags = props.data1.tags;
    let notes = props.data2.notes
    axios.post("http://localhost:3001/edit",{
      ...gender,tags,notes
    }).then(console.log("done"))
     console.log({...gender,tags,notes})
  }
 
  const handleChange = (newValue) => {
    if (newValue) props.data1.setTags([...newValue]);
  };
  console.log(props.data.gender);
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
          </div>
          <div>
            <p>
              <FontAwesomeIcon icon={faBiohazard} style={{ marginRight: "10px" }} />
              Change Your Bio :
            </p>
            <textarea
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
              <CreatableSelect isClearable isMulti defaultValue={props.data1.tags} onChange={handleChange} />
            </div>
          </div>
        </div>
        <br />
        <br />
        <button className="btn" onClick={() => handelEditProfile()}>Edit</button>
        <br />
      </div>
    </div>
  );
}

export default EditProfile;
