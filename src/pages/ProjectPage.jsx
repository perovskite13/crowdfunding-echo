import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProgressBar from "../components/ProgressBar/ProgressBar";

function ProjectPage(){
    const [projectData, setProjectData] = useState({ pledges: [] });
    const { id } = useParams();
    
    const sum = projectData.pledges.reduce(((result,pledge)=> result+pledge.amount),0); //300
    const goal = projectData.goal; //150
    const progress = (sum/goal)<=1 ? ((sum/goal)*100) : 100;
    const testData = [
        { bgcolor: "#00695c", completed: Math.round(progress) },
      ];

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}echo/${id}/`)
        .then((results) => {
        return results.json();
        })
        .then((data) => {
        setProjectData(data);
        });
        }, []);
        
    //return <h1> This is the project page. </h1>;
    return (
    <div>
    <div className= "project">
        <div id="project-details">
        <h1 id = "title">{projectData.title}</h1>
        <hr/>
        <h3>Created at: {projectData.date_created}</h3>
        <h3>Goal: $ {projectData.goal}</h3>
        <h3>{`Active: ${projectData.is_open}`}</h3>
        <h3>Pledges:</h3>
        <h2>Total - $ {sum}</h2>
        <ul>
            {projectData.pledges.map((pledgeData, key) => {
                return (
                    <li>
                        $ {pledgeData.amount} from {pledgeData.supporter}
                    </li>
                );              
            })
            }
        </ul>
        
        <div className="App">
            {testData.map((item, idx) => (
                <ProgressBar key={idx} bgcolor={item.bgcolor} completed={item.completed} />
            ))}
        </div>

        <div className = "img-container">
            <img src={projectData.image} alt=""/>
        </div>

        </div>
    </div>
    <footer> Copyright Echo 2020</footer>

    </div>
    );
}

export default ProjectPage;