import React from "react";
import PostForm from "../components/PostForm/PostForm";
import {isAuthenticated} from "../helpers/localStorage";


function CreatePage(){
    if(isAuthenticated()){
        return <PostForm />;
    }
    return (
    <div className = "notAllowed">
        <h1> Login or Sign-Up to Create Projects! </h1>
    </div>
    )
}

export default CreatePage;