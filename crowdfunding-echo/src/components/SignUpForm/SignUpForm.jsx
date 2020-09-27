import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";


function SignUpForm(props){
    //variables
    const[credentials,setCredentials] = useState({
        username: "",
        email: "",
        password: "",
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


    // useEffect(() => {
    //     fetch(`${process.env.REACT_APP_API_URL}users/`)
    //         .then((response) => response.json())
    //         .then((data) => console.log(data))
    //     },[])
    //     return response.json();
    // };

    //get token
    const handleSubmit = (e) => {
        e.preventDefault();
        if(credentials.password == credentials.confirmPassword){
            handleChange().then((response)=> {
                window.localStorage.setItem("signup", response.username);
                history.push("/");
            });
        }else{
            props.showError('Passwords do not match');
        }
    };

    //template
    return(
        <form className = "sign-up">
            <h1>Sign Up</h1>
            <hr />
            <div className = "field">
                <label htmlFor="username">Username: </label>
                <input className = "input" type="text" 
                id="username" 
                placeholder="Enter username" 
                onChange = {handleChange}/>
            </div>
            <div className = "field">
            <label htmlFor="email">Email: </label>
                <input className = "input" type="email" 
                id="email" 
                placeholder="Enter email" 
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
                <label > Already have an account? </label>
                <Link  to="/login/">  Login </Link>
            </div>
            <hr />
            <button className = "submit-button" type="submit" 
            onClick={handleSubmit}>
                Sign Up
            </button>
        </form>
    );
}

export default SignUpForm;