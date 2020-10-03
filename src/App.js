import React,{useState} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import LoggedInContext from './components/LoggedInContext/LoggedInContext';

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage";
import ProjectPage from "./pages/ProjectPage";
import CreatePage from "./pages/CreatePage";
import UserPage from "./pages/UserPage";
import SignUpPage from "./pages/SignUpPage";

import "./App.css";

function App(){

  return(
    <div className = "App">
      <div>
      
        <Router>
        <div >
          <Nav className = "nav" />
          <Switch>
          
          <Route path="/echo/:id">
            <ProjectPage />
          </Route>

          <Route path="/createProject/">
            <CreatePage />
          </Route>

          <Route path="/login/">
            <LoginPage />
          </Route>

          <Route path="/users/:id">
            <UserPage />
          </Route>

          <Route path="/signUp/">
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
  )
}

export default App;