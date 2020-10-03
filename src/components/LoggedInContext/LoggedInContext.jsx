import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { clearStorage } from "../../helpers/localStorage";
import { getStorage } from "../../helpers/localStorage";

function LoggedInContext() {
    const history = useHistory();
    const [loggedin, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const LoggedInContext = React.createContext({
        isLoggedIn: false,
        setLoggedIn: () => {}
     })
    
    const isAuthenticated = () => {
        let token = getStorage("token");
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

    const logout = () =>{
        clearStorage();
        history.push("/");
    }
    
    
    if (loggedin) {
        LoggedInContext.setLoggedIn(true);
            //return (props.children);
        return true;
    } else {
        return false;
            //history.push("/login");
            //return null;
    };


}
export default LoggedInContext; 
 

