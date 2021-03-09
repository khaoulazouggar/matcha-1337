import React from "react";
import "./css/style.css";
import "./css/App.css";
import Login from "./views/Auth/login";
import Register from "./views/Auth/register";
import About from "./views/pages/about";
import Home from "./views/pages/home";
import Edit from "./views/pages/edit";
import Error from "./Components/error";
import Fgpass from "./views/Auth/fgpass";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Steps from "./Components/steps";
import Navbar from "./Components/navbar";
import Confirm from "./views/Auth/confim";
import Changepass from "./views/Auth/changepass";
import Profile from "./views/pages/profile";
import History from "./views/pages/history";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/confirm/:token" component={Confirm} />
          <Route path="/changepass/:token" component={Changepass} />
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/profile/:profilename">
            <Navbar />
            <Profile />
          </Route>
          <Route path="/fgpass">
            <Fgpass />
          </Route>
          <Route path="/edit">
            <Navbar />
            <Edit />
          </Route>
          <Route path="/steps">
            <Navbar />
            <Steps />
          </Route>
          <Route path="/history">
            <Navbar />
            <History />
          </Route>
          <Route exact path="/">
            <Navbar />
            <Home />
          </Route>
          <Route path="*" component={Error} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
