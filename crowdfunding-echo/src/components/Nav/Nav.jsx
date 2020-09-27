import React,{useContext} from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import LoggedInContext from '../LoggedInContext/LoggedInContext';
import "./Nav.css";

import PrivateRoute from "../LoggedInContext/LoggedInContext";


function Nav(){
    const history = useHistory();
    //const [loggedIn, setLoggedIn] = useState(false);
    //const loggedIn = PrivateRoute(); //returning true or false
    const loggedIn = useContext(LoggedInContext);
    console.log(loggedIn);

    function clearToken(){
        window.localStorage.clear();
        history.push("/");
    };

    //console.log(loggedIn);
    if (loggedIn) {
        return (
        <nav id = "nav-container">
            <Link className = "nav-text" href="/">Home</Link>
            <Link className = "nav-text" href="/" onClick = {() => clearToken()}>Logout</Link>
            <Link className = "nav-text" href="/users/">Sign Up</Link>
            <Link className = "nav-text" href="/echo/">Create</Link>

        </nav>
        );
    } else {
        return (
        <nav id = "nav-container">
            <Link className = "nav-text" to="/">Home</Link>
            <Link className = "nav-text" to="/login">Login</Link>
            <Link className = "nav-text" to="/users/">Sign Up</Link>
            <Link className = "nav-text" to="/echo/">Create</Link>

        </nav>
        );
    }
}

export default Nav;

