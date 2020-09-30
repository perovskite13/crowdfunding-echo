import React,{useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import "./Nav.css";
import { clearStorage } from "../../helpers/localStorage";
import { getStorage } from "../../helpers/localStorage";


function Nav(){
    const history = useHistory();
    const [loggedin, setLoggedIn] = useState(false);
    //const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        //const token = window.localStorage.getItem("token");
        const token = getStorage("token");
        console.log(token);
        token != null ? setLoggedIn(true) : setLoggedIn(false);
      }, [location]);

    const logout = () =>{
        clearStorage();
        history.push("/");
    }
    console.log(loggedin);
    
    return (
        <nav id = "nav-container">
            <Link className = "nav-text" to="/">Home</Link>
            {!loggedin ?(
                <>
                <Link className = "nav-text" to="/login" >Login</Link>
                </>
            ):(
                <>
                <Link className = "nav-text" onClick = {logout} to="/" >Logout</Link>
                </>
            )
        }
            <Link className = "nav-text" to="/users/">Sign Up</Link>
            <Link className = "nav-text" to="/echo/">Create</Link>
        </nav>
    );
}

export default Nav;

