import React from "react"
import "../../css/edit.css"
import {Upload} from "react-feather"
import {Edit2} from "react-feather"
import {Key} from "react-feather"
import {User} from "react-feather"



function Edit (){
    return (
        <div className="box-form">
        <div className="left-edit">
            <div className="edit-pic">
                <input className="file" type="file" accept="image/*"/>
                <div className="drag-text"><Upload style={{paddingTop: "50px"}} size={40}/>
                  <h3> Edit your profile's picture</h3>
                </div>
            </div>
            <div className="edit">
              <Edit2 style={{marginRight: "10px"}}/><span className="edit-child">  Edit your information</span>
              <br/> <br/>
              <User style={{marginRight: "10px"}}/><span className="edit-child">Edit your profile</span>
              <br/> <br/>
              <Key style={{marginRight: "10px"}}/><span className="edit-child">change your password</span>
            </div>
        </div>
        <div className="right">
          <h1>Edit Your Account</h1>
          <br />
          <br />
          <p>Please Enter Your new information :</p>
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
            placeholder="New user name"
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
          <button className="btn" onClick>
            Edit
          </button>
          <br />
        </div>
      </div>
    )
}
export default Edit;