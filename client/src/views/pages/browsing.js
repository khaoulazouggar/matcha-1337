// import React, { useState }  from 'react';
// import {Link} from 'react-router-dom';
// import "../../css/research.css"
// import search from "../../photos/search.svg"
// import abdellah from "../../photos/abdellah.jpg"
// import upload from "../../photos/upload.gif";
// import verified from "../../photos/verified.gif";
// import write from "../../photos/write.gif";
// import test from "../../photos/test.jpeg";
// import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import Rating from '@material-ui/lab/Rating';
// import Box from '@material-ui/core/Box';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import HighlightOffIcon from '@material-ui/icons/HighlightOff';

// const useStyles = makeStyles({
//   root: {
//     width: 200,
//   },
//   res: {
//     flexBasis: '30%',
//     maxWidth: '310px',
//     marginTop: '20px',
//     marginBottom: '40px',

//   },
//   FavoriteIcon: {
//     color: '#5961f9ad',
//     cursor: 'pointer',
// },
//   cnt: {
//     justifyContent: 'center',
//     margin: '12px',
//   },
//   card :{
//     display: 'flex',
//     flexDirection : 'column',
//     justifyContent: 'center',
//     alignItem: 'center',
//   },
//   rating: {
//     marginBottom : 0,
//     width: 160,
//   },
//   sort : {
//     flexDirection: 'row',
//   },
//   radio: {
//     "&$checked": {
//       color: "#5961f9ad"
//     }
//   },
//   checked :{},
//   "@media (max-width: 1180px)": {
//     root:{
//       width: '300px',
//     },
//     rating:{
//       width: '160px',
//       margin: '6px'
//     },
//   },
//   "@media (max-width: 800px)": {
//       sort: {
//       flexDirection: "column",
//     },
//     root:{
//       width: '200px',
//     }
//   }
// });
// function Research(){

//   const classes = useStyles();
//   // const [dis, setDis] = useState([]);

//   function computeDistance([prevLat, prevLong], [lat, long]) {
//     const prevLatInRad = toRad(prevLat);
//     const prevLongInRad = toRad(prevLong);
//     const latInRad = toRad(lat);
//     const longInRad = toRad(long);
  
//     return (
//       // In kilometers
//       (6377.830272 *
//       Math.acos(
//         Math.sin(prevLatInRad) * Math.sin(latInRad) +
//           Math.cos(prevLatInRad) * Math.cos(latInRad) * Math.cos(longInRad - prevLongInRad),
//       ))
//     );
//   }
  
//   function toRad(angle) {
//     return (angle * Math.PI) / 180;
//   }
//   const people = [
//     {
//       name: 'James',
//       age: 30,
//       location : computeDistance([33.57384481713102, -7.587149686558293], [33.454767083471516, -7.517111844805549]),
//       rating : 3,
//       tags : 5,
//       img : test,
//     },
//     {
//       name: 'John',
//       age: 45,
//       location : computeDistance([33.57498899958384, -7.588522977573053], [32.95262543780583, -6.846945829602815]),
//       rating : 4.5,
//       tags : 2,
//       img : upload,
//     },
//     {
//       name: 'Paul',
//       age: 65,
//       location : computeDistance([32.952951115826366, -6.825746399716012], [32.95120753720113, -6.846598696347603]),
//       rating : 5,
//       tags : 4,
//       img : verified,
//     },
//     {
//       name: 'Ringo',
//       age: 49,
//       location : computeDistance([32.86797764991025, -6.913888918961159], [33.18947165375718, -6.656963771824534]),
//       rating : 2.5,
//       tags : 3,
//       img : write,
//     },
//     {
//       name: 'George',
//       age: 100,
//       location : computeDistance([32.86797764991025, -6.913888918961159], [33.25444464691913, -6.878030717351149]),
//       rating : 2.5,
//       tags : 1,
//       img : abdellah,
//     }
//   ];
//   return(
//     <div className="filter">
//       <div className="undraw-div">
//         <div>
//             <h3>Welecome Rihana</h3>
//             <p> </p>
//         </div>
//         <div>
//           <img
//           alt=""
//           src={search}
//           />
//           </div>
//       </div>
//       <div className="resulte">
//       {
//         people.filter(person => person.age >= person[0].age && person[1].age <= age[1] && person.location >= location[0] && person.location <= location[1] && person.tags >= tags[0] && person.tags <= tags[1] && person.rating >= 0 && person.rating <= rating).sort((a, b) => (a[sort] - b[sort])).map((filterPerson, index) =>(
//               <div className={classes.res} key={index}>
//                   <Card
//                   >
//                     <CardActionArea
//                     className={classes.card}
//                       >
//                         <img
//                           alt = "profile"
//                           className="research_image"
//                           src={filterPerson.img}
//                         />
//                         <CardContent
//                         className={classes.CardContent}
//                         >
//                           <Typography gutterBottom variant="h5" component="h2">
//                             {filterPerson.name}
//                             <br></br>
//                             {(filterPerson.location).toString().substr(0,2)}Km
//                           </Typography>
//                           <p>{filterPerson.age} years old</p>
//                         </CardContent>
//                         <Box component="fieldset" mb={3} borderColor="transparent">
//                           <Rating name="read-only" value={filterPerson.rating}  precision={0.5} readOnly />
//                         </Box>
//                     </CardActionArea>
//                     <div className="icons">
//                       <FavoriteIcon 
//                             className={classes.FavoriteIcon}
//                       />
//                       <HighlightOffIcon
//                         className={classes.FavoriteIcon}
//                       />
//                     </div>
//                     <CardActions className={classes.cnt}>
//                       <Button variant="outlined" color="primary">
//                         <Link to="/edit">Visit</Link> 
//                       </Button>
//                     </CardActions>
//                   </Card>
//               </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// export default Research
// // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
