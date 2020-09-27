import React,{useState} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import LoggedInContext from './components/LoggedInContext/LoggedInContext';

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage";
import ProjectPage from "./pages/ProjectPage";
import CreatePage from "./pages/CreatePage";
import SignUpPage from "./pages/SignUpPage";

import "./App.css";

function App(){


  return(
    // <LoggedInContext.Provider value={{ loggedIn, setLoggedIn }}>
    <div className = "App">
      <div>
      
        <Router>
        <div >
          <Nav className = "nav" />
          <Switch>
          
          <Route path="/echo/:id">
            <ProjectPage />
          </Route>

          <Route path="/echo/">
            <CreatePage />
          </Route>

          <Route path="/login/">
            <LoginPage />
          </Route>

          <Route path="/users/">
            <SignUpPage />
          </Route>

          <Route path="/">
            <HomePage />

          </Route>
          
        </Switch>
        </div>
        </Router>

    </div>

    </div>
    
    // </LoggedInContext.Provider> 
  )
}

export default App;