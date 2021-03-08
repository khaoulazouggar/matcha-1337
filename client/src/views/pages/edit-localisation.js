import React, { useState, useEffect } from "react";
import MapWithAMarker from "../../Components/googleMap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";


function EditLocalisation() {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const history = useHistory();

  const handelEditLocalisation = () => {
    axios
        .post(
          "http://localhost:3001/editLocation",
          {
          ...center
          },
          { headers: { "x-auth-token": localStorage.getItem("token") } }
        )
        .then((res) => {
          if (res.data === "U failed to authenticate" || res.data === "we need a token") {
            localStorage.removeItem("token");
            history.push("/login");
          } else {
            if (res.data === "nothing changed") {
              Swal.fire({
                icon: "error",
                text: "Nothing Changed",
                showConfirmButton: false,
                heightAuto: false,
              });
            }else if (res.data === "modified") {
              Swal.fire({
                icon: "success",
                text: "Your location have been successfully modified.",
                showConfirmButton: false,
                heightAuto: false,
              });
            }
            // console.log(res.data);
          }
        });
  };

  useEffect(() => {
    let unmount = false;
    axios
      .get("http://localhost:3001/getData", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then((res) => {
        if (!unmount) {
          if (
            res.data === "U failed to authenticate" ||
            res.data === "we need a token"
          ) {
            localStorage.removeItem("token");
            history.push("/login");
          } else {
            center.lat = res.data[0].latitude;
            center.lng = res.data[0].longitude;
            setCenter({ ...center });
          }
        }
      });
    return () => {
      unmount = true;
    }; // eslint-disable-next-line
  }, [history]);
  
  return (
    <div className="rightE">
      <h1>Edit Account</h1>
      <br />
      <br />
      <p>Change Your Position :</p>
      <br />
      <MapWithAMarker
        data={{ center, setCenter }}
        className="map"
        // containerElement={<div style={{ height: `400px` }} />}
        // mapElement={<div style={{ height: `100%` }} />}
        // center={center}
      />
      <br />
      <div style={{ marginRight: "15px" }}>
        <button className="btn" onClick={() => handelEditLocalisation()}>
          Edit
        </button>
      </div>
      <br />
    </div>
  );
}

export default EditLocalisation;
