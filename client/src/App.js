import React from "react";
import "./css/App.css";
import Login from "./Components/login";
import Register from "./Components/register";
import About from "./Components/about";
import Home from "./Components/home";
import Error from "./Components/error";
import Fgpass from "./Components/fgpass";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Steps from "./Components/steps";
import Navbar from "./Components/navbar"

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />

          <Route path="/register" component={Register} />

          <Route path="/login" component={Login} />

          <Route path="/about" component={About} />

          <Route path="/fgpass" component={Fgpass} />
          <Route path="/steps" component={Steps} />
          <Route path="*" component={Error} />
        </Switch>

      </div>
    </Router>
  );
}

export default App;
