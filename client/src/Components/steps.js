import React from "react";
import "../css/steps.css";
import hc from "../photos/hc.png";
import list from "../photos/write.svg";
import { ArrowRight } from "react-feather";
import { ArrowLeft } from "react-feather";


function Steps() {
  return (
    // <div className="steps">
    //   <div className="progressbar">
    //     <div>1</div>
    //     <div></div>
    //     <div>2</div>
    //     <div></div>
    //     <div>3</div>
    //   </div>
    //   <div className="all">
    //     <div className="step">
    //       <div className="s">
    //         {/* <div className= "step1">step 1</div> */}
    //         <p className="para">what is your gender ?</p>
    //         <span className="gender">
    //           <button className="genre">male</button>
    //           <button className="genre">female</button>
    //         </span>
    //         <p className="para">what are you looking for ?</p>
    //         <span className="gender">
    //           <button className="genre">male</button>
    //           <button className="genre">female</button>
    //           {/* <button className="genre">both</button> */}
    //         </span>
    //       </div>

    //       <div className="photo">
    //         <img src={hc} style={{ width: "275px" }} />

    //       </div>
    //     </div>
    //     <div className="divv">
    //           <button className="next">Next <ArrowRight style={{display:"flex" ,float: "right", marginTop: 2}} size={20} /></button>
    //     </div>
    //   </div>
    // </div>

    <div className="steps">
      <div className="progressbar">
        <div>1</div>
        <div></div>
        <div>2</div>
        <div></div>
        <div>3</div>
      </div>
      <div className="all">
        <div className="step">
          <div className="s">
       
            <textarea className="bio" type="text" placeholder="Add your Bio" />
            
          </div>

          <div className="photo">
            <img alt="" src={list} style={{ width: "380px", marginTop:40 }} />
          </div>
        </div>
        <div className="divv">
          <button className="previous"> <ArrowLeft style={{marginRight:9 ,display:"flex" ,float: "left", marginTop: 2}} size={20} />Previous</button>
          <button className="next">Next <ArrowRight style={{display:"flex" ,float: "right", marginTop: 2}} size={20} /></button>
        </div>
      </div>
    </div>
  );
}
export default Steps;
