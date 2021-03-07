import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  height: "400px",
};

const MapWithAMarker = ({ center }) => {
  // getting Center Location from props
  const centerPosition = {
    lat: parseFloat(center.lat),
    lng: parseFloat(center.lng),
  };
  return (
    <LoadScript googleMapsApiKey="AIzaSyDa5RXStNKw7x9iuPni05lv2BsVY8d34e8">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centerPosition}
        zoom={10}
        onClick={({ latLng }) => {
          const lat = latLng.lat();
          const lng = latLng.lng();
          console.log(lat, lng);
        }}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export { MapWithAMarker };
