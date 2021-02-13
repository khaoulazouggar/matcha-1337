import React  from 'react';
import {Link} from 'react-router-dom';
import "../../css/research.css"
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import test from "../../photos/test.jpeg";
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles({
  root: {
    width: 200,
  },
  res: {
    flexBasis: '30%',
    marginTop: '20px',
  },
  cnt: {
    justifyContent: 'center',
  },
  rating: {
    marginBottom : 0,
    width: 160,
  },
  sort : {
    flexDirection: 'row',
  },
  radio: {
    "&$checked": {
      color: "#5961f9ad"
    }
  },
  checked :{},
});
function valuetext(value) {
  return `${value}°C`;
}
function Research(){
  const classes = useStyles();
  const [age, setAge] = React.useState([0, 100]);
  const [location, setLocation] = React.useState([0, 400]);
  const [tags, setTags] = React.useState([0, 20]);
  const [rating, setRating] = React.useState(2);
  const [sort, setSort] = React.useState('age');

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
  return(
    <div className="filter">
      <div className="search">
      <div className="child">
          <Box component="fieldset" mb={3} borderColor="transparent" className={classes.rating}>
            <Typography component="legend">Fame Rating</Typography>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={ratingChange}
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
                max={400}
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
                max={20}
                onChange={tagsChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
              />
          </div>
        </div>
      </div>
      <Button variant="outlined" color="primary">
          <Link to="#">Filter</Link>
      </Button>
      <div className="sort">
        <FormControl component="fieldset">
        <FormLabel component="legend">Sort by</FormLabel>
        <RadioGroup aria-label="Sort" name="sort" value={sort} onChange={sortChange} className={classes.sort}>
          <FormControlLabel value="age" control={<Radio classes={{checked: classes.checked,
            colorSecondary: classes.radio,}} />} label="Age" />
          <FormControlLabel value="loaction" control={<Radio  classes={{checked: classes.checked,
            colorSecondary: classes.radio,}} />} label="Location" />
          <FormControlLabel value="rating" control={<Radio classes={{checked: classes.checked,
            colorSecondary: classes.radio,}} />} label="Fame Rating" />
          <FormControlLabel value="tags" control={<Radio  classes={{checked: classes.checked,
            colorSecondary: classes.radio,}} />} label="Tags" />
        </RadioGroup>
      </FormControl>
      </div>
      <div className="resulte">
          <Card className={classes.res}>
            <CardActionArea>
              <img
                alt = "profile"
                className="test"
                src={test}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Rihana
                </Typography>
                <p>23 year old</p>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.cnt}>
              <Button variant="outlined" color="primary">
                <Link to="/edit">Visit</Link>
              </Button>
            </CardActions>
        </Card>
          </div>
    </div>
  );
}
export default Research
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
