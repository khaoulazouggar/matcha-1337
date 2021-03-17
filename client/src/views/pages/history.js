import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../../css/history.css";
import { HistoryPost } from "../../Components/HistoryPost";

function History() {
  const history = useHistory();
  const [ProfileImg, setProfileImg] = useState([]);

  useEffect(() => {
    return new Promise((resolve, reject) => {
      let unmount = false;
      axios
        .get("http://localhost:3001/getposition", {
          headers: { "x-auth-token": localStorage.getItem("token") },
        })
        .then((res) => {
          if (!unmount) {
            if (res.data === "U failed to authenticate" || res.data === "we need a token") {
              localStorage.removeItem("token");
              history.push("/login");
            } else {
              if (!res?.data[0]?.latitude) {
                history.push("/steps");
                // console.log(res);
              } else {
                // setdone(1);
              }
            }
          }
        });
      return () => {
        unmount = true;
      };
    }); // eslint-disable-next-line
  }, []);

  useEffect(
    () => {
      let unmount = false;
      axios
        .get(`http://localhost:3001/gethistory`, {
          headers: { "x-auth-token": localStorage.getItem("token") },
        })
        .then((res) => {
          if (!unmount) {
            if (res.data === "U failed to authenticate" || res.data === "we need a token") {
              localStorage.removeItem("token");
              history.push("/login");
            } else {
              setProfileImg([...res.data]);
            }
          }
        });
      return () => {
        unmount = true;
      };
    }, // eslint-disable-next-line
    []
  );

  return (
    <div className="box-form">
      <div className="history">
        {ProfileImg.map((post, key) => (
          <HistoryPost key={key} post={post} />
        ))}
      </div>
    </div>
  );
}
export default History;
