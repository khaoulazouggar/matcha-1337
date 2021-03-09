import React, { useState, useEffect } from "react";
import isEmail from "../../tools/isEmail";
import isUsername from "../../tools/isUsername";
import isName from "../../tools/isName";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

function EditInfo(props) {
  const [Nfirstname, setNfirstname] = useState("");
  const [errNfirstname, seterrNfirstname] = useState("");
  const [Nlastname, setNlastname] = useState("");
  const [errNlastname, seterrNlastname] = useState("");
  const [Nusername, setNusername] = useState("");
  const [errNusername, seterrNusername] = useState("");
  const [Nemail, setNemail] = useState("");
  const [errNemail, seterrNemail] = useState("");
  const history = useHistory();
  const [done, setdone] = useState(0);

  useEffect(() => {
    if (Nfirstname && !isName(Nfirstname) && Nfirstname.length < 24)
      seterrNfirstname("First name is not valide (minimum is 3 letters)");
    else if (Nfirstname.length > 24)
      seterrNfirstname("First name is too long (maximum is 24 letters)");
    else seterrNfirstname("");
    if (Nlastname && !isName(Nlastname) && Nlastname.length < 24)
      seterrNlastname("Last Name is not valide (minimum is 3 letters)");
    else if (Nlastname.length > 24)
      seterrNlastname("Last name is too long (maximum is 24 letters)");
    else seterrNlastname("");
    if (Nusername && !isUsername(Nusername) && Nusername.length < 24)
      seterrNusername("Username is not valide (minimum is 3 characters)");
    else if (Nusername.length > 24)
      seterrNusername("Username is too long (maximum is 24 characters)");
    else seterrNusername("");
    if (Nemail && !isEmail(Nemail)) seterrNemail("Email is not valide");
    else seterrNemail("");
  }, [Nfirstname, Nlastname, Nusername, Nemail]);

  const handelEdit = () => {
    if (!Nfirstname) seterrNfirstname("First name should not be empty");

    if (!Nlastname) seterrNlastname("Last name should not be empty");

    if (!Nusername) seterrNusername("Username should not be empty");

    if (!Nemail) seterrNemail("Email should not be empty");
    if (
      Nusername &&
      Nfirstname &&
      Nlastname &&
      Nemail &&
      !errNusername &&
      !errNfirstname &&
      !errNlastname &&
      !errNemail
    )
      axios
        .post(
          "http://localhost:3001/edit",
          {
            Nfirstname,
            Nlastname,
            Nusername,
            Nemail,
          },
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
            if (res.data === "nothing changed") {
              Swal.fire({
                icon: "error",
                text: "Nothing Changed",
                showConfirmButton: false,
                heightAuto: false,
              });
            } else if (res.data === "username is already used") {
              Swal.fire({
                icon: "error",
                text: "Username is already used",
                showConfirmButton: false,
                heightAuto: false,
              });
            } else if (res.data === "email is already used") {
              Swal.fire({
                icon: "error",
                text: "Email is already used",
                showConfirmButton: false,
                heightAuto: false,
              });
            } else if (res.data === "updated") {
              Swal.fire({
                icon: "success",
                text: "Your informations have been successfully modified.",
                showConfirmButton: false,
                heightAuto: false,
              });
            }
            console.log(res.data);
          }
        });
  };

  useEffect(() => {
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
    }; // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let unmount = false;
    if (done) {
      axios
        .get("http://localhost:3001/getData", {
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
              setNfirstname(res.data[0].firstname);
              setNlastname(res.data[0].lastname);
              setNusername(res.data[0].username);
              setNemail(res.data[0].email);
              // console.log(res.data);
              if (res.data[0].profilePic)
                props.data.setProfileImg(
                  "http://localhost:3001/images/" + res.data[0].profilePic
                );
            }
          }
        });
    }
    return () => {
      unmount = true;
    }; // eslint-disable-next-line
  }, [history, done]);

  return (
    <div className="rightE">
      <h1>Edit Account</h1>
      <br />
      <br />
      <p>Please Enter Your New Information :</p>
      <div className="inp">
        <div className="inputs">
          <label className="edit-label">First name :</label>
          <input
            className="inptE"
            type="text"
            // placeholder={Nfirstname}
            value={Nfirstname}
            onChange={(e) => {
              setNfirstname(e.target.value);
            }}
          />
          <span className="errors">{errNfirstname}</span>
          <br />
          <label className="edit-label">Last name :</label>
          <input
            className="inptE"
            type="text"
            // placeholder="New last name"
            value={Nlastname}
            onChange={(e) => {
              setNlastname(e.target.value);
            }}
          />
          <span className="errors">{errNlastname}</span> <br />
          <label className="edit-label">Username :</label>
          <input
            className="inptE"
            type="text"
            placeholder="New username"
            value={Nusername}
            onChange={(e) => {
              setNusername(e.target.value);
            }}
          />
          <span className="errors">{errNusername}</span>
          <br />
          <label className="edit-label">Email :</label>
          <input
            className="inptE"
            type="email"
            placeholder="New email"
            value={Nemail}
            onChange={(e) => {
              setNemail(e.target.value);
            }}
          />
          <span className="errors">{errNemail}</span>
        </div>
      </div>
      <br />
      <br />
      <div style={{ marginRight: "15px" }}>
        <button className="btn" onClick={() => handelEdit()}>
          Edit
        </button>
      </div>
    </div>
  );
}

export default EditInfo;
