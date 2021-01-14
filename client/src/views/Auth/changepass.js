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
        <h5>Password</h5>
        <p>
          Don't have an account? <a href="./register">Creat Your Account</a> it takes less than a minute
        </p>
        <div className="inputs">
          <input
            className="inpt"
            type="password"
            placeholder="Password"
            //   value={password}
            //   onChange={(e) => {
            //     setpassword(e.target.value);
            //   }}
          />
          {/* <span className="errors">{errpassword}</span> */}
        </div>
        <br />
        <br />

        <div className="forget-password">
          <a href="./fgpass">forget password?</a>
        </div>
        <br />
        <button className="btn">Change password</button>
      </div>
    </div>
  );
}
export default Changepass;
