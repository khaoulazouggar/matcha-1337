import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import React from "react";

const containerStyle = {
  height: "400px",
  width: "100%",
};
function MapWithAMarker(props) {
  
  const centerPosition = {
    lat: parseFloat(props.data.center.lat),
    lng: parseFloat(props.data.center.lng),
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBWRRPwssHd-F_zgFZdR1X08BtQ5i1TVmY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={centerPosition}
          zoom={10}
          onClick={({ latLng }) => {
            const lat = latLng.lat();
            const lng = latLng.lng();
            props.data.center.lat = lat;
            props.data.center.lng = lng;
            props.data.setCenter({ ...props.data.center });
            console.log(latLng);
          }}
        >
          <Marker position={props.data.center} />
        </GoogleMap>
    </LoadScript>
  );
}

export default MapWithAMarker;
