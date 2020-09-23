import React from "react";
import {Link} from "react-router-dom";
import "./ProjectCard.css";

function ProjectCard(props){ 
    //variables
    const {projectData} = props;

    //template
    return(
        <div className="project-card">
            <Link to={`/echo/${projectData.id}`}>
                <img src={projectData.image}/>
                <h3>{projectData.title}</h3>
            </Link>
        </div>
    );
}

export default ProjectCard;