import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, useHistory, useLocation, Link, useParams } from "react-router-dom";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import {getStorage, isOwner, setStorage} from "../helpers/localStorage";
import PledgeForm from "../components/PledgeForm/PledgeForm";
import DeleteForm from "../components/DeleteForm/DeleteForm";

function ProjectPage(){
    //console.log(isOwner());
    const history = useHistory();
    const [loggedin, setLoggedIn] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const token = getStorage("token");
        console.log(token);
        token != null ? setLoggedIn(true) : setLoggedIn(false);
      }, [location]);
    
    const [projectData, setProjectData] = useState({ 
        pledges: [] 
    });
    const { id } = useParams();
    
    const sum = projectData.pledges.reduce(((result,pledge)=> result+pledge.amount),0); 
    const progress = (sum/projectData.goal)<=1 ? ((sum/projectData.goal)*100) : 100;
    const testData = [
        { bgcolor: "#00695c", completed: Math.round(progress) },
      ];

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}echo/${id}/`
        )
        .then((results) => {
        return results.json();
        })
        .then((data) => {
        setProjectData(data)
        }
        );
        }, []);

    return (
    <div>
    <div className= "project">
        <div id="project-details">
        <h1 id = "title">{projectData.title}</h1>
        <hr/>
    <h3><b>Created at:</b> {projectData.date_created}</h3> 
    <h3><b>Initiated by: </b>{projectData.owner}</h3>
    <h3><b>Description:</b> {projectData.description}</h3>

        <h3><b>Goal: </b> $ {projectData.goal}</h3>
        <h3><b>Active:</b> {`${projectData.is_open}`}</h3>
        <h3><b>Pledges: </b>Total - $ {sum}</h3>
        
        <div className="App">
            
            {testData.map((item, idx) => (
                <ProgressBar key={idx} bgcolor={item.bgcolor} completed={item.completed} />
            ))}
        </div>

        <div className = "img-container">
            <img src={projectData.image} alt=""/>
        </div>

        <hr/>
        {loggedin  ?(
            <>
            {isOwner(projectData.owner)?(
                <div className = "button-inline">
                <Link to={`/editProject/${id}`}>
                    <button className="submit-button" >
                        Edit 
                    </button>
                </Link>
                <DeleteForm />
                </div>
            ):(
                <>
                </>
            )}
            <PledgeForm projectData={projectData} />
            </>
        ):(
            <>
            </>
        )
        }
        <h1>Our Loyal Supporters</h1>
        <ul>
            {projectData.pledges.map((pledgeData, key) => 
            {
                return (
                        <li>
                        $ {pledgeData.amount} from {pledgeData.supporter}
                        </li>
                );             
            })
            }
        </ul>
        </div>
    </div>
    <footer> Copyright Echo 2020</footer>

    </div>
    );
}

export default ProjectPage;

