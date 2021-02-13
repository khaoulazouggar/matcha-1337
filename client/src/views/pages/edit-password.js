import React ,{useState, useEffect}from "react";
import isPassword from "../../tools/isPassword";
import axios from "axios";

function EditPass() {
  const [Npassword, setNpassword] = useState("");
  const [errNpassword, seterrNpassword] = useState("");
  const [verifyNpassword, setverifyNpassword] = useState("");
  const [errverifyNpassword, seterrverifyNpassword] = useState("");

  const handelEditPassword = () =>{
    if(Npassword &&
      verifyNpassword === Npassword && !errNpassword &&
      !errverifyNpassword)
    axios.post("http://localhost:3001/edit",{
      Npassword, verifyNpassword
    }).then(console.log("done"))
     console.log({Npassword, verifyNpassword})
  }

  useEffect(()=> {
    if (Npassword && !isPassword(Npassword))
    seterrNpassword(
      "Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    );
  else seterrNpassword("");
  if (verifyNpassword && Npassword !== verifyNpassword) seterrverifyNpassword("Verify Password is not valide");
  else seterrverifyNpassword("");
  },[Npassword, verifyNpassword]);
  return (
    <div className="rightE">
      <h1>Edit  Account</h1>
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
          value={Npassword}
          onChange={(e) => {
            setNpassword(e.target.value);
          }}
        />
        <span className="errors">{errNpassword}</span> <br />
        <input
          className="inpt"
          type="password"
          placeholder="Verify New Password"
          value={verifyNpassword}
          onChange={(e) => {
            setverifyNpassword(e.target.value);
          }}
        />
        <span className="errors">{errverifyNpassword}</span>
      </div>
      <br />
      <br />
      <button className="btn" onClick={() => handelEditPassword() }>Edit</button>
    </div>
  );
}

export default EditPass;
