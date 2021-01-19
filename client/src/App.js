import React from "react";
import "./css/style.css";
import "./css/App.css";
import Login from "./views/Auth/login";
import Register from "./views/Auth/register";
import About from "./views/pages/about";
import Home from "./views/pages/home";
import Error from "./Components/error";
import Fgpass from "./views/Auth/fgpass";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Steps from "./Components/steps";
import Navbar from "./Components/navbar";
import Confirm from "./views/Auth/confim";
import Changepass from "./views/Auth/changepass";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}
        <Switch>
          <Route exact path="/"> <Home/> <Navbar /> </Route>

          <Route exact path="/register"> <Register/><Navbar/> </Route>

          <Route exact path="/login"> <Login/><Navbar/> </Route>

          <Route path="/about"> <About/><Navbar/> </Route>

          <Route path="/fgpass"> <Fgpass/><Navbar/> </Route>

          <Route path="/confirm/:token" component={Confirm} />

          <Route path="/changepass/:token" component={Changepass} />

          <Route path="/steps"> <Steps/><Navbar/> </Route>

          <Route path="*" component={Error} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
