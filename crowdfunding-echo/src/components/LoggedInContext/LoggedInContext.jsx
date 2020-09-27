import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function LoggedInContext() {
    const history = useHistory();
    const [loggedin, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const LoggedInContext = React.createContext({
        isLoggedIn: false,
        setLoggedIn: () => {}
     })
    
    //const loggedInContext = React.useContext(LoggedInContext);

    const isAuthenticated = () => {
        let token = window.localStorage.getItem("token");
        if (token != null) {
            return true;
        } else {
            return false;
        }
    };
    
    useEffect(() => {
        setLoggedIn(isAuthenticated());
        setLoading(false);
    }, []);
    
    if (loading === true) {
        return <h1>Loading....</h1>;
    };
    
    
    if (loggedin) {
        LoggedInContext.setLoggedIn(true);
        console.log(LoggedInContext);
            //return (props.children);
        return true;
    } else {
        return false;
            //history.push("/login");
            //return null;
    };


}
export default LoggedInContext; 
 

