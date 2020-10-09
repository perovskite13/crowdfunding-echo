import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {setStorage} from "../../helpers/localStorage";


function SignUpForm(props){
    //variables
    const[credentials,setCredentials] = useState({
        username: "",
        email: "",
        password: "",
        bio: "",
        location: "",
        is_mentor: false
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
    // console.log(credentials);

    const postData = async() => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}users/`,{
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
        if(credentials.username && credentials.email && credentials.password  ){
            postData().then((response)=> {
                //window.localStorage.setItem("signup", response.username);
                setStorage("signup",response.username);
                history.push("/login");
            });
        }else{
            props.showError('Fill in all details');
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
            <div className = "field">
            <label htmlFor="bio">Bio: </label>
                <input className = "input" type="bio" 
                id="bio" 
                placeholder="Enter bio" 
                onChange = {handleChange}/>
            </div>
            <div className = "field">
            <label htmlFor="location">Location: </label>
                <input className = "input" type="location" 
                id="location" 
                placeholder="Enter location" 
                onChange = {handleChange}/>
            </div>
            <div className = "field">
            <label htmlFor="is_mentor">Want to be a Mentor?:    </label>
            <select 
            className = "input" 
            type="select" 
            id="is_mentor" 
            onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
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