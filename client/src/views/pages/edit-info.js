import React from "react";
// import { Info } from "react-feather"

function EditInfo() {
  return (
    <div className="rightE">
      <h1>Edit Account</h1>
      <br />
      <br />
      <p>Please Enter Your New Information :</p>
      <div className="inputs">
        <input
          className="inpt"
          type="text"
          placeholder="New first name"
          // value={firstname}
          // onChange={(e) => {
          //   setfirstname(e.target.value);
          // }}
        />
        {/* <span className="errors">{errfirstname}</span> */}
        <br />
        <input
          className="inpt"
          type="text"
          placeholder="New last name"
          // value={lastname}
          // onChange={(e) => {
          //   setlastname(e.target.value);
          // }}
        />
        {/* <span className="errors">{errlastname}</span> <br /> */}
        <input
          className="inpt"
          type="text"
          placeholder="New username"
          // value={username}
          // onChange={(e) => {
          //   setusername(e.target.value);
          // }}
        />
        {/* <span className="errors">{errusername}</span> */}
        <br />
        <input
          className="inpt"
          type="email"
          placeholder="New email"
          // value={email}
          // onChange={(e) => {
          //   setemail(e.target.value);
          // }}
        />
        {/* <span className="errors">{erremail}</span> */}
      </div>
      <br />
      <br />
      <button className="btn">Edit</button>
      <br />
    </div>
  );
}

export default EditInfo;
