import React from "react";
import "./css/style.css";
import "./css/App.css";
import Login from "./views/Auth/login";
import Register from "./views/Auth/register";
import About from "./views/pages/about";
import Home from "./views/pages/home";
import Chat from "./views/pages/chat";
import Research from "./views/pages/research";
import Browsing from "./views/pages/browsing";
import Edit from "./views/pages/edit";
import Error from "./Components/error";
import Footer from "./Components/footer";
import Fgpass from "./views/Auth/fgpass";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Steps from "./Components/steps";
import Navbar from "./Components/navbar";
import Confirm from "./views/Auth/confim";
import Changepass from "./views/Auth/changepass";


function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route path="/research" component={Research} />
          <Route path="/browsing" component={Browsing} />
          <Route path="/confirm" component={Confirm} />
          <Route path="/chat" component={Chat} />
          <Route path="/changepass" component={Changepass} />
          <Route exact path="/register"> <Register/> </Route>
          <Route exact path="/login"> <Login/> </Route>
          <Route path="/about"> <About/> </Route>
          <Route path="/fgpass"> <Fgpass/> </Route>
          <Route path="/edit"> <Edit/> </Route>
          <Route path="/steps"> <Steps/> </Route>
          <Route exact path="/"> <Home/>  </Route>
          <Route path="*" component={Error} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
