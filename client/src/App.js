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
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />

          <Route path="/register" component={Register} />

          <Route path="/login" component={Login} />

          <Route path="/about" component={About} />

          <Route path="/fgpass" component={Fgpass} />

          <Route path="/confirm/:token" component={Confirm} />

          <Route path="/changepass" component={Changepass} />

          <Route path="/steps" component={Steps} />

          <Route path="*" component={Error} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
