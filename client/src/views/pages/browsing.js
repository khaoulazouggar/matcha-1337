import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../css/research.css";
import search from "../../photos/search.svg";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Box from "@material-ui/core/Box";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { useHistory } from "react-router-dom";
import noUser from "../../photos/noUser.png";

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
  CardContent: {
    textAlign: "center",
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
function valuetext(value) {
  return `${value}°C`;
}
function Research() {
  const classes = useStyles();
  const [age, setAge] = useState([0, 0]);
  const [location, setLocation] = useState([0, 120]);
  const [tags, setTags] = useState([0, 5]);
  const [rating, setRating] = useState(0);
  const [sort, setSort] = useState("age");
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [me, setMe] = useState("");
  // const [genderLooking, setgenderLooking] = useState('');
  // const [dis, setDis] = useState([]);

  function computeDistance([prevLat, prevLong], [lat, long]) {
    const prevLatInRad = toRad(prevLat);
    const prevLongInRad = toRad(prevLong);
    const latInRad = toRad(lat);
    const longInRad = toRad(long);

    return (
      // In kilometers
      6377.830272 *
      Math.acos(
        Math.sin(prevLatInRad) * Math.sin(latInRad) +
          Math.cos(prevLatInRad) * Math.cos(latInRad) * Math.cos(longInRad - prevLongInRad)
      )
    );
  }

  function toRad(angle) {
    return (angle * Math.PI) / 180;
  }

  const sortChange = (event) => {
    setSort(event.target.value);
  };
  const ageChange = (event, newAge) => {
    setAge(newAge);
  };
  const locationChange = (event, newLoction) => {
    setLocation(newLoction);
  };
  const tagsChange = (event, newTags) => {
    setTags(newTags);
  };
  const ratingChange = (event, newRating) => {
    setRating(newRating);
  };
  function calcAge(dateString) {
    var birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / 31557600000);
  }

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

  useEffect(() => {
    let unmount = false;
    axios
      .get("http://localhost:3001/getusers", { headers: { "x-auth-token": localStorage.getItem("token") } })
      .then((res) => {
        if (!unmount) {
          if (res.data === "U failed to authenticate" || res.data === "we need a token") {
            localStorage.removeItem("token");
            history.push("/login");
          } else {
            setUsers(res.data);
            // console.log(res);
          }
        }
      });
    axios
      .get("http://localhost:3001/getData", { headers: { "x-auth-token": localStorage.getItem("token") } })
      .then((res) => {
        if (!unmount) {
          if (res.data === "U failed to authenticate" || res.data === "we need a token") {
            localStorage.removeItem("token");
            history.push("/login");
          } else {
            setMe(res.data);
            setAge([calcAge(res.data[0]?.birthday) - 5, calcAge(res.data[0]?.birthday) + 15]);
            setRating(res.data[0]?.rating + 3);
            // setgenderLooking(res.data[0]?.genderLooking);
          }
        }
      });
    return () => {
      unmount = true;
    };
    // eslint-disable-next-line
  }, []);
  function compareArray(a, b) {
    var res = 0;
    for (var i = 0; i < a.length; i++) {
      for (var x = 0; x < b.length; x++) {
        if (a[i] === b[x]) {
          res++;
        }
      }
    }
    return res;
  }
  var meTags = me[0]?.tags;
  let meTag = [];
  if (meTags) {
    meTags = JSON.parse(meTags);
    meTags?.map((tag) => meTag.push(tag.label));
  }
  // console.log(meTag)
  const items = [...users];
  var people = items?.map((usr) => {
    usr.age = calcAge(usr.birthday);
    usr.location = computeDistance([me[0]?.latitude, me[0]?.longitude], [usr.latitude, usr.longitude]);

    let allTags = JSON.parse(usr.tags);
    usr.allTags = [];
    allTags?.map((tag) => usr.allTags.push(tag.label));
    if (usr.allTags && meTags) {
      usr.tasgCount = compareArray(usr.allTags, meTag);
    }
    return usr;
  });
  function removeInSearch(id) {
    people = people.filter((items) => items.id !== id);
    setUsers(people);
  }
  people?.filter((fil) => fil.rating > 5).map((rat) => (rat.rating = 5));
  if (!users) return <div></div>;
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
      <div className="search">
        <div className="child">
          <Box component="fieldset" mb={3} borderColor="transparent" className={classes.rating}>
            <Typography component="legend">Fame Rating</Typography>
            <Rating
              name="simple-controlled"
              precision={0.5}
              value={rating}
              onChange={ratingChange}
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
            />
          </Box>
        </div>
        <div className="child">
          <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
              Age
            </Typography>
            <Slider
              value={age}
              min={18}
              max={100}
              onChange={ageChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
            />
          </div>
        </div>
        <div className="child">
          <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
              Location (Km)
            </Typography>
            <Slider
              value={location}
              min={0}
              max={200}
              onChange={locationChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
            />
          </div>
        </div>
        <div className="child">
          <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
              Interests Tags
            </Typography>
            <Slider
              value={tags}
              min={0}
              max={5}
              onChange={tagsChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
            />
          </div>
        </div>
      </div>
      <div className="sort">
        <FormControl component="fieldset">
          <FormLabel component="legend">Sort by</FormLabel>
          <RadioGroup aria-label="Sort" name="sort" value={sort} onChange={sortChange} className={classes.sort}>
            <FormControlLabel
              value="age"
              control={<Radio classes={{ checked: classes.checked, colorSecondary: classes.radio }} />}
              label="Age"
            />
            <FormControlLabel
              value="location"
              control={<Radio classes={{ checked: classes.checked, colorSecondary: classes.radio }} />}
              label="Location"
            />
            <FormControlLabel
              value="rating"
              control={<Radio classes={{ checked: classes.checked, colorSecondary: classes.radio }} />}
              label="Fame Rating"
            />
            <FormControlLabel
              value="tasgCount"
              control={<Radio classes={{ checked: classes.checked, colorSecondary: classes.radio }} />}
              label="Tags"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="resulte">
        {people
          .filter(
            (person) =>
              person.age >= age[0] &&
              person.location >= location[0] &&
              person.location <= location[1] &&
              person.rating >= 0 &&
              person.rating <= rating &&
              person.tasgCount >= tags[0] &&
              person.tasgCount <= tags[1]
          )
          .sort((a, b) => a[sort] - b[sort])
          .map((filterPerson, index) => (
            <div className={classes.res} key={index}>
              <Card>
                <CardActionArea className={classes.card}>
                  <img
                    alt="profile"
                    className="research_image"
                    src={
                      filterPerson?.profilePic
                        ? filterPerson?.profilePic.substr(0, 5) === "https"
                          ? filterPerson?.profilePic
                          : "http://localhost:3001/images/" + filterPerson?.profilePic
                        : noUser
                    }
                  />
                  <CardContent className={classes.CardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {filterPerson?.firstname} {filterPerson?.lastname}
                      <br></br>
                    </Typography>
                    <p>{filterPerson?.location.toString().substr(0, 4)}Km</p>
                    <p>{filterPerson.age} years old</p>
                  </CardContent>
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <Rating name="read-only" value={filterPerson.rating} precision={0.5} readOnly />
                    <p></p>
                  </Box>
                </CardActionArea>
                <div className="icons">
                  <HighlightOffIcon className={classes.FavoriteIcon} onClick={() => removeInSearch(filterPerson.id)} />
                </div>
                <CardActions className={classes.cnt}>
                  <Button variant="outlined" color="primary">
                    <Link to={`/profile/${filterPerson.username}`}>Visit</Link>
                  </Button>
                </CardActions>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}
export default Research;
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
