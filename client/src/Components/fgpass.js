import React from "react";

function Fgpass() {
  return (
    <div>
      <div className="box-form">
        <div className="left">
          <div className="overlay">
            <h1>Forgotten Your Password?</h1>

            <p>
              For security reasons, we do NOT store your password. So rest assured that we will
              never send your password via email.
            </p>
          </div>
        </div>

        <div className="right">
          <br />
          <br />
          <p>
            Enter the email address you used when you joined and we’ll send you instructions to
            reset your password.
          </p>
          <div className="inputs">
            <input type="email" placeholder="Email" />
          </div>
          <br />
          <br />

          <button className="btn">Send Reset Instructions</button>
          <br />
          <p>
            Just remembered? <a href="./login">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Fgpass;
