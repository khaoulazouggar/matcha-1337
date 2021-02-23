import React, { useEffect } from "react";


function Instep(props) {

  useEffect (() => {
      navigator.geolocation.getCurrentPosition(function(successHandler, errorHandler) {
      console.log("Latitude is :", successHandler.coords.latitude);
      console.log("Longitude is :", successHandler.coords.longitude);
    })
    
});

  console.log(props.data.gender);
  return (
    <div className="In">
      <p className="para">What is your gender ?</p>
      <span className="gender">
        <button
          className="genre"
          style={{backgroundColor: props.data.gender.yourGender === 'male' ? 'green' : '#5961f9ad'}}
          onClick={(e) => {
            
            let data = props.data.gender;
            data.yourGender = "male";
            props.data.setGender({...data});
          }}
        >
          male
        </button>
        <button
          className="genre"
          style={{backgroundColor: props.data.gender.yourGender === 'female' ? 'green' : '#5961f9ad'}}
          onClick={() => {
            let data = props.data.gender;
            data.yourGender = "female";
            props.data.setGender({...data});
          }}
        >
          female
        </button>
      </span>
      <p className="para">What are you looking for ?</p>
      <span className="gender">
        <button className="genre" 
        style = {{backgroundColor: props.data.gender.genderLooking === "male" ? "green" : "#5961f9ad"}}
        onClick={() => {
          let data = props.data.gender
          data.genderLooking = "male"
          props.data.setGender({...data})
        }}>male</button>
        <button className="genre"     
        style = {{backgroundColor: props.data.gender.genderLooking === "female" ? "green" : "#5961f9ad"}}
        onClick={() => {
          let data = props.data.gender
          data.genderLooking = "female"
          props.data.setGender({...data})
        }}>female</button>
          <button className="genre"     
        style = {{backgroundColor: props.data.gender.genderLooking === "both" ? "green" : "#5961f9ad"}}
        onClick={() => {
          let data = props.data.gender
          data.genderLooking = "both"
          props.data.setGender({...data})
        }}>both</button>
      </span>
    </div>
  );
}
export default Instep;
