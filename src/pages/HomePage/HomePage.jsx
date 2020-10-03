import React, {useState, useEffect} from "react";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import logo from "../../echo.jpg";

//import { allProjects } from "../../data";


function HomePage(){
    //variables
    const[projectList, setProjectList] = useState([]);

    //methods
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}echo/`)
        .then((results) => {
            return results.json();
        })
        .then((data) => {
            setProjectList(data);
        });
        //setProjectList(allProjects); //reading from data dump
    },[]);

    //template
    //return <h1> This is the home page. </h1>;
    return (
        <div>
            <div className = "App-header">
                <img id="home-pic" src={logo} className="App-logo" alt="logo" />
                <h2>Crowdfunding Platform On Environmental Sustainability </h2>
                <hr />
                <h1>Purpose</h1>
                <h3>To allow Citizen Scientists to collaborate on science-informed projects relevant to environmental sustainability.</h3>
                <p>This platform aims to facilitate knowledge sharing between scientific academia/science-informed policy and community, and educate community on science related to environmental and sustainability issues. 
                    Members can create and build innovative projects with access to guidance by professional scientists and scientific institutions, or even pledge to support their favourite projects within their community. </p>
                    <p><b>Citizen scientists</b>, including professional scientists, can create, support or pledge for projects. </p>
                    <p><b>Professional scientists</b> can link their publications and has the option to act as a mentor to facilitate community projects with their experties.</p>
            </div>
            <div id='project-list' >
            {projectList.map((projectData, key) => {
                //return <div key={key}>{projectData.title}</div>;
                return <ProjectCard key={key} projectData={projectData} />;
            })}
            </div>
            <footer>
                <hr/>
                Copyright Echo 2020</footer>

        </div>

    );
}

export default HomePage;