import React from "react";
import "./App.css";
import Login from "./Components/login";
import Register from "./Components/register";
import About from "./Components/about";
import Home from "./Components/home";
import Error from "./Components/error";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div div className="App">
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />

            <Route path="/login" component={Login} />

            <Route path="/about" component={About} />

            <Route path="*" component={Error} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
