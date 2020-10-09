import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import "./Form.css";
import {getStorage, setStorage} from "../../helpers/localStorage";


function LoginForm(){
    //variables
    const[credentials,setCredentials] = useState({
        username: "",
        password:"",
    });

    const history = useHistory();

    //methods
    //set state
    const handleChange = (e)=> {
        const {id, value} = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };


    const postData = async() => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}api-token-auth/`,{
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        return response.json();
    };

    //get token
    const handleSubmit = (e) => {
        e.preventDefault();
        if(credentials.username && credentials.password){
            postData().then((response)=> {
                setStorage("token", response.token);
                //window.localStorage.setItem("user", credentials.username);
                setStorage("user", credentials.username);
                history.push("/");
            });
        }
    };

    const SignupLink = ({inUpClick}) => (
        <div className="signup-link">
          <p className="in-out"> 
            Don't have an account? {" "}
            <a href="#" onClick={inUpClick}>Sign Up Here</a>
          </p>
        </div>
    );
      
    

    //template
    return(
        <form className = "login">
            <h1>Login</h1>
            <hr />

            <div className = "field">
                <label htmlFor="username">Username: </label>
                <input className = "input" type="text" 
                id="username" 
                placeholder="Enter username" 
                onChange = {handleChange}/>
            </div>
            <div className = "field">
            <label htmlFor="password">Password: </label>
                <input className = "input" type="password" 
                id="password" 
                placeholder="Enter password" 
                onChange = {handleChange}/>
            </div>
            <div  className="in-out">
                <label  >Don't have an account? </label>
                <Link  to="/signup/">  Sign Up </Link>
            </div>
            <hr />
            <button className="submit-button" type="submit" 
            onClick={handleSubmit}>
                Login
            </button>
        </form>
    );
}

export default LoginForm;