import React from "react";
import "../css/steps.css";

function Steps() {
  return (
    <div className='steps'>
      <div className="progressbar">
        <div>1</div>
        <div></div>
        <div>2</div>
        <div></div>
        <div>3</div>
      </div>
      <div className="step">
          <div className= "step1">step 1</div>
          <div>what is your gender
              <button>male</button>
              <button>female</button>
          </div>
          <div>what are you looking for
              <button>male</button>
              <button>female</button>
              <button>both</button>
          </div>

      </div>
    </div>
  );
}
export default Steps;
