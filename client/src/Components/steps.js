import React from "react";
import "../css/steps.css";
import hc from "../photos/hc.png";

function Steps() {
  return (
    <div className="steps">
      <div className="progressbar">
        <div>1</div>
        <div></div>
        <div>2</div>
        <div></div>
        <div>3</div>
      </div>
      <div className="step">
        <div className="s">
          {/* <div className= "step1">step 1</div> */}
          <p className="para">what is your gender ?</p>
          <span className="gender">
            <button className="genre">male</button>
            <button className="genre">female</button>
          </span>
          <p className="para">what are you looking for ?</p>
          <span className="gender">
            <button className="genre">male</button>
            <button className="genre">female</button>
            {/* <button className="genre">both</button> */}
          </span>
          
        </div>

        <div className="photo">
          <img src={hc} style={{ width: "275px" }} />
          <div className="divv">
            <button className="next">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Steps;
