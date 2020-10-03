import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import {getStorage, isAuthenticated, setStorage} from "../helpers/localStorage";


function UserPage(){
    const [userData, setUserData] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const token = getStorage("token")
        fetch(`${process.env.REACT_APP_API_URL}users/${id}/`,{
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`,
            },
        })
        .then((results) => {
        return results.json();
        })
        .then((data) => {
            setUserData(data);
        });
        console.log(userData);
        }, []);


        
    return (
        <div id = "project-spread">
            <div className="profile">
            <div id = "project-details">
                <h1 id="profile-head">Profile</h1>
                <h2>Citizen Scientist</h2>
                <h3 >Username : {userData.username}</h3>
                <h3 >Email : {userData.email}</h3>
                <h3 >Bio : {userData.bio}</h3>
                <h3 >Location : {userData.location}</h3>
                {/* <h3 >Mentor : {userData.username}</h3> */}
            </div>  
            </div>
        </div>
        
    );
}

export default UserPage;