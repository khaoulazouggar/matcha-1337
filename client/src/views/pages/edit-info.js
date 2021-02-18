import React, { useState, useEffect } from "react";
import isEmail from "../../tools/isEmail";
import isUsername from "../../tools/isUsername";
import isName from "../../tools/isName";
import axios from "axios";

function EditInfo() {
  const [Nfirstname, setNfirstname] = useState("");
  const [errNfirstname, seterrNfirstname] = useState("");
  const [Nlastname, setNlastname] = useState("");
  const [errNlastname, seterrNlastname] = useState("");
  const [Nusername, setNusername] = useState("");
  const [errNusername, seterrNusername] = useState("");
  const [Nemail, setNemail] = useState("");
  const [errNemail, seterrNemail] = useState("");

  useEffect(() => {
    if (Nfirstname && !isName(Nfirstname) && Nfirstname.length < 24) seterrNfirstname("First name is not valide (minimum is 3 letters)");
    else if (Nfirstname.length > 24) seterrNfirstname("First name is too long (maximum is 24 letters)");
    else seterrNfirstname("");
    if (Nlastname && !isName(Nlastname) && Nlastname.length < 24) seterrNlastname("Last Name is not valide (minimum is 3 letters)");
    else if (Nlastname.length > 24) seterrNlastname("Last name is too long (maximum is 24 letters)");
    else seterrNlastname("");
    if (Nusername && !isUsername(Nusername) && Nusername.length < 24) seterrNusername("Username is not valide (minimum is 3 characters)");
    else if (Nusername.length > 24) seterrNusername("Username is too long (maximum is 24 characters)");
    else seterrNusername("");
    if (Nemail && !isEmail(Nemail)) seterrNemail("Email is not valide");
    else seterrNemail("");
  }, [Nfirstname, Nlastname, Nusername, Nemail]);

  const handelEdit = () => {
    if (!Nfirstname) seterrNfirstname("First name should not be empty");

    if (!Nlastname) seterrNlastname("Last name should not be empty");

    if (!Nusername) seterrNusername("Username should not be empty");

    if (!Nemail) seterrNemail("Email should not be empty");
    if (Nusername && Nfirstname && Nlastname && Nemail && !errNusername && !errNfirstname && !errNlastname && !errNemail)
      axios
        .post("http://localhost:3001/edit", {
          Nfirstname,
          Nlastname,
          Nusername,
          Nemail,
        })
        .then(console.log("done"));
    console.log({ Nfirstname, Nlastname, Nusername, Nemail });
  };
  return (
    <div className="rightE">
      <h1>Edit Account</h1>
      <br />
      <br />
      <p>Please Enter Your New Information :</p>
      <div className="inp">
        <div className="inputs">
          <input
            className="inpt"
            type="text"
            placeholder="New first name"
            value={Nfirstname}
            onChange={(e) => {
              setNfirstname(e.target.value);
            }}
          />
          <span className="errors">{errNfirstname}</span>
          <br />
          <input
            className="inpt"
            type="text"
            placeholder="New last name"
            value={Nlastname}
            onChange={(e) => {
              setNlastname(e.target.value);
            }}
          />
          <span className="errors">{errNlastname}</span> <br />
          <input
            className="inpt"
            type="text"
            placeholder="New username"
            value={Nusername}
            onChange={(e) => {
              setNusername(e.target.value);
            }}
          />
          <span className="errors">{errNusername}</span>
          <br />
          <input
            className="inpt"
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
      <button className="btn" onClick={() => handelEdit()}>
        Edit
      </button>
      <br />
      <br />
    </div>
  );
}

export default EditInfo;
