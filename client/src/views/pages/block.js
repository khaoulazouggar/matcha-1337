import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../css/research.css";
import search from "../../photos/search.svg";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const useStyles = makeStyles({
  root: {
    width: 200,
  },
  res: {
    flexBasis: "30%",
    maxWidth: "310px",
    marginTop: "20px",
    marginBottom: "40px",
  },
  FavoriteIcon: {
    color: "#5961f9ad",
    cursor: "pointer",
  },
  cnt: {
    justifyContent: "center",
    margin: "12px",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItem: "center",
  },
  rating: {
    marginBottom: 0,
    width: 160,
  },
  sort: {
    flexDirection: "row",
  },
  CardContent: {
    textAlign: "center",
  },
  radio: {
    "&$checked": {
      color: "#5961f9ad",
    },
  },
  checked: {},
  "@media (max-width: 1180px)": {
    root: {
      width: "300px",
    },
    rating: {
      width: "160px",
      margin: "6px",
    },
  },
  "@media (max-width: 800px)": {
    sort: {
      flexDirection: "column",
    },
    root: {
      width: "200px",
    },
  },
});
function Unblock() {
  const classes = useStyles();
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [me, setMe] = useState("");
  // const [dis, setDis] = useState([]);

  function computeDistance([prevLat, prevLong], [lat, long]) {
    const prevLatInRad = toRad(prevLat);
    const prevLongInRad = toRad(prevLong);
    const latInRad = toRad(lat);
    const longInRad = toRad(long);

    return (
      // In kilometers
      6377.830272 * Math.acos(Math.sin(prevLatInRad) * Math.sin(latInRad) + Math.cos(prevLatInRad) * Math.cos(latInRad) * Math.cos(longInRad - prevLongInRad))
    );
  }

  function toRad(angle) {
    return (angle * Math.PI) / 180;
  }

  function calcAge(dateString) {
    var birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / 31557600000);
  }
  function unblockUsers(id) {
    axios.post("http://localhost:3001/unblock", { blocker: me[0].id, blocked: id }).then((response) => {
      if (response.data.status === true) {
        Swal.fire({
          icon: "success",
          text: "users has ben unblocked",
          showConfirmButton: false,
        });
        setUsers(users.filter((user) => user.blocked !== id));
      }
      if (response.data.err === true) {
        console.log("error");
      }
    });
  }
  useEffect(
    () => {
      let unmount = false;
      axios.get("http://localhost:3001/getusersblocked", { headers: { "x-auth-token": localStorage.getItem("token") } }).then((res) => {
        if (!unmount) {
          if (res.data === "U failed to authenticate" || res.data === "we need a token") {
            localStorage.removeItem("token");
            history.push("/login");
          } else {
            setUsers(res.data);
          }
        }
      });
      axios.get("http://localhost:3001/getData", { headers: { "x-auth-token": localStorage.getItem("token") } }).then((res) => {
        if (!unmount) {
          if (res.data === "U failed to authenticate" || res.data === "we need a token") {
            localStorage.removeItem("token");
            history.push("/login");
          } else {
            setMe(res.data);
          }
        }
      });
      return () => {
        unmount = true;
      };
    },
    // eslint-disable-next-line
    []
  );
  const items = [...users];
  const people = items.map((usr) => {
    usr.age = calcAge(usr.birthday);
    return usr;
  });
  return (
    <div className="filter">
      <div className="undraw-div">
        <div>
          <h3>Welcome {me[0]?.username}</h3>
          <p> </p>
        </div>
        <div>
          <img alt="" src={search} />
        </div>
      </div>
      <div className="resulte">
        {people.map((filterPerson, index) => (
          <div className={classes.res} key={index}>
            <Card>
              <CardActionArea className={classes.card}>
                <img alt="profile" className="research_image" src={"http://localhost:3001/images/" + filterPerson?.profilePic} />
                <CardContent className={classes.CardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {filterPerson.firstname} {filterPerson.lastname}
                    <br></br>
                    {computeDistance([me[0]?.latitude, me[0]?.longitude], [filterPerson.latitude, filterPerson.longitude]).toString().substr(0, 4)}Km
                  </Typography>
                  <p>{filterPerson.age} years old</p>
                </CardContent>
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Rating name="read-only" value={filterPerson.rating} precision={0.5} readOnly />
                </Box>
              </CardActionArea>
              <CardActions className={classes.cnt}>
                <Button variant="outlined" color="primary" onClick={() => unblockUsers(filterPerson.blocked)}>
                  <Link to="#">Unblock</Link>
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Unblock;
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
