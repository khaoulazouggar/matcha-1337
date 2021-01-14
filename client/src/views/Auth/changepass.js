import React, { useEffect } from "react";

function Changepass(props) {
  useEffect(() => {
    console.log(props.match.params.token);
    // const token = props.match.params.token;
  });
  return (
    <div className="box-form">
      <div className="left">
        <div className="overlay">
          <h1>Find Your Perfect Match</h1>
          <br />
          <p>
            We are here to build emotion, connect people and create happy stories. Online dating sites are the way to go for people seeking
            love.
          </p>
        </div>
      </div>
      <div className="right">
        <h1>Reset Password !</h1>
        <br />
        <br />
        <p>
        Please Enter Your new Password
        </p>
        <div className="inputs">
          <input
            className="inpt"
            type="password"
            placeholder="New Password"
            //   value={password}
            //   onChange={(e) => {
            //     setpassword(e.target.value);
            //   }}
          />
          {/* <span className="errors">{errpassword}</span> */}
          <input
            className="inpt"
            type="password"
            placeholder="Confirm New Password"
            //   value={password}
            //   onChange={(e) => {
            //     setpassword(e.target.value);
            //   }}
          />
          {/* <span className="errors">{errpassword}</span> */}
        </div>
        <br />
        <br />
        <button className="btn">Change password</button>
        <br />
          <p>
            Just remembered? <a href="./login">Log in</a>
          </p>
      </div>
    </div>
  );
}
export default Changepass;
