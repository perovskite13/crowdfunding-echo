import React from "react";
import { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import EditForm from "../components/EditForm/EditForm";
import {isAuthenticated} from "../helpers/localStorage";


function EditPage(){
    const [projectData, setProjectData] = useState({ 
        pledges: [] 
    });
    const {id} = useParams();
    console.log(id); //undefined

    useEffect(() =>{
        fetch(`${process.env.REACT_APP_API_URL}echo/${id}/`)
        .then((results) => {
            return results.json();
        })
        .then((data) => {
            setProjectData(data);
        });
    },[id])

    if(isAuthenticated()){
        return <EditForm projectData = {projectData}/>;
    }
    return (
    <div className = "notAllowed">
        <h1> Login or Sign-Up to Edit Projects! </h1>
    </div>
    )
}

export default EditPage;