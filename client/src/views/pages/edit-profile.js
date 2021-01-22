import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTransgender } from "@fortawesome/free-solid-svg-icons";
import { faTransgenderAlt } from "@fortawesome/free-solid-svg-icons";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { faBiohazard } from "@fortawesome/free-solid-svg-icons";
import CreatableSelect from "react-select/creatable";

function EditProfile() {
  const [gender, setGender] = useState("");
  const [genderLoking, setGenderLoking] = useState("");

  return (
    <div className="right">
      <h1>Edit Your Account</h1>

      <div>
        <div className="In">
          <p>
            <FontAwesomeIcon
              icon={faTransgender}
              style={{ marginRight: "10px" }}
            />
            Your Gender :
          </p>
          <span className="gender">
            <button
              className="genre"
              onClick={() => setGender("male")}
              style={{
                backgroundColor: gender === "male" ? "green" : "#5961f9ad",
              }}
            >
              male
            </button>
            <button
              className="genre"
              style={{
                backgroundColor: gender === "female" ? "green" : "#5961f9ad",
              }}
              onClick={() => setGender("female")}
            >
              female
            </button>
          </span>
          <p>
            <FontAwesomeIcon
              icon={faTransgenderAlt}
              style={{ marginRight: "10px" }}
            />
            Looking for :
          </p>
          <span className="gender">
            <button
              className="genre"
              onClick={() => setGenderLoking("male")}
              style={{
                backgroundColor:
                  genderLoking === "male" ? "green" : "#5961f9ad",
              }}
            >
              male
            </button>
            <button
              className="genre"
              onClick={() => setGenderLoking("female")}
              style={{
                backgroundColor:
                  genderLoking === "female" ? "green" : "#5961f9ad",
              }}
            >
              female
            </button>
            <button
              className="genre"
              onClick={() => setGenderLoking("both")}
              style={{
                backgroundColor:
                  genderLoking === "both" ? "green" : "#5961f9ad",
              }}
            >
              both
            </button>
          </span>
          <p>
            <FontAwesomeIcon
              icon={faBiohazard}
              style={{ marginRight: "10px" }}
            />
            Change Your Bio :
          </p>
          <textarea
            className="edit-bio"
            type="text"
            placeholder="Change Your Bio"
          />
          <div className="edit-tags">
            <p>
              <FontAwesomeIcon icon={faTags} style={{ marginRight: "10px" }} />
              Change Your Tags ...
            </p>
            <CreatableSelect isClearable isMulti />
          </div>
        </div>

        <br />
        <br />
        <button className="btn">Edit</button>
        <br />
      </div>
    </div>
  );
}

export default EditProfile;
