import React, {  useEffect } from "react";
// import axios from "axios";
// import { useHistory } from "react-router-dom";
// import Swal from "sweetalert2";

function EditLocalisation() {
  // const history = useHistory();
  const handelEditLocalisation = () => {
  
  };

  useEffect(() => {
   // eslint-disable-next-line
  }, []);
  return (
    <div className="rightE">
      <h1>Edit Account</h1>
      <br />
      <br />
      <p>Change Your Position :</p>
  
      <br />
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
