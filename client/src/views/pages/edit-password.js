import React from "react"

function EditPass(){
    return(
        <div className="right">
          <h1>Edit Your Account</h1>
          <br />
          <br />
          <p>Change Your Password :</p>
       

          <div className="inputs">
          <input
            className="inpt"
            type="password"
            placeholder="Old Password"
            // value={password}
            // onChange={(e) => {
            //   setpassword(e.target.value);
            // }}
          />
          {/* <span className="errors">{errpassword}</span> <br />  */}
          <input
            className="inpt"
            type="password"
            placeholder="New Password"
            // value={password}
            // onChange={(e) => {
            //   setpassword(e.target.value);
            // }}
          />
          {/* <span className="errors">{errpassword}</span> <br /> */}
          <input
            className="inpt"
            type="password"
            placeholder="Verify New Password"
            // value={verifypassword}
            // onChange={(e) => {
            //   setverifypassword(e.target.value);
            // }}
          />
          {/* <span className="errors">{errverifypassword}</span> */}
        </div>
        <br />
        <br />
        <button className="btn">
          Edit
        </button>
      </div>
    )
}

export default EditPass