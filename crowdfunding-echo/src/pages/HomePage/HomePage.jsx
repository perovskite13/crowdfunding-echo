import React, {useState, useEffect} from "react";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { allProjects } from "../../data";


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
        <div id='project-list' >
            {projectList.map((projectData, key) => {
                //return <div key={key}>{projectData.title}</div>;
                return <ProjectCard key={key} projectData={projectData} />;
            })}
        </div>
    );
}

export default HomePage;