import React,{useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import "./Nav.css";
import { clearStorage } from "../../helpers/localStorage";
import { getStorage } from "../../helpers/localStorage";


function Nav(){
    const history = useHistory();
    const [loggedin, setLoggedIn] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const token = getStorage("token");
        console.log(token);
        token != null ? setLoggedIn(true) : setLoggedIn(false);
      }, [location]);

    const logout = () =>{
        clearStorage();
        history.push("/");
    }
    
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
            <Link className = "nav-text" to="/signup/">Sign Up</Link>
            <Link className = "nav-text" to="/createProject/">Create</Link>
            {!loggedin ?(
                <>
                </>
            ):(
                <>
                <Link className = "nav-text" to="/users/me/" >{getStorage("user")}</Link> 
                </>
            )
        }
                <hr/>
        </nav>
    );
}
//hard coded to return default user
export default Nav;

