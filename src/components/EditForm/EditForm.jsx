import React, { useState,useEffect } from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import {getStorage, isAuthenticated, isOwner, setStorage} from "../../helpers/localStorage";


function EditForm(props){
    const {projectData} = props;
    // console.log(projectData);
    const [projectDetails,setProjectDetails] = useState([]);
    const history = useHistory();
    const {id} = useParams();


    useEffect(() =>{
        setProjectDetails({
            title: projectData.title,
            description: projectData.description,
            goal: projectData.goal,
            image: projectData.image,
            is_open: projectData.is_open,
            owner: projectData.owner,
        });
    }
    ,[projectData]);

    //console.log(projectDetails);

    //methods
    //set state
    const handleChange = (e)=> {
        const {id, value} = e.target;
        setProjectDetails((prevProjectDetails) => ({
            ...prevProjectDetails,
            [id]: value,
        }));
    };

    const postData = async() => {
      const token = getStorage("token")
      try{
        const response = await fetch(`${process.env.REACT_APP_API_URL}echo/${id}/`,{
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `token ${token}`,
            },
            body: JSON.stringify(projectDetails),
        });
        return response.json();
      } catch(e) {
        // console.log(e);
        history.push(`/error/`);
      }
    };

    //get token
    const handleSubmit = (e) => {
        e.preventDefault();
          postData(isOwner()).then(res => {
            setStorage("title",projectDetails.title);
            console.log(res.id)
            if(res.id === undefined){
              history.push(`/error/`);
            }else{
              history.push( `/echo/${res.id}`);
            }
        }
        );
      
    }

    //template
    return ( 
      <div>
        <form className = "create">
        <h1>Edit Project</h1>
        <hr />
          <div id = "inline">
              <div className = "field">
              <label htmlFor="title">Title:    </label>
              <input
            className = "input"
              type="text"
              id="title"
              placeholder="Project Title"
              onChange={handleChange}
              value = {projectDetails.title}
              />
          </div>
          <div className = "field">
            <label htmlFor="goal">Goal amount:    </label>
            <input
              className = "input"
              type="number"
              id="goal"
              placeholder="Fund Target"
              onChange={handleChange}
              value = {projectDetails.goal}
            />
          </div>
          </div>
          <div id = "wide">
          <div className = "field-wide">
            <label htmlFor="description">Description: </label>
            <input
              className = "input-wide"
              type="text"
              id="description"
              placeholder="Project Description"
              onChange={handleChange}
              value = {projectDetails.description}
            />
          </div>
          
          <div className = "field-wide">
            <label htmlFor="image">Image: </label>
            <input
              className = "input-wide"
              type="url"
              id="image"
              placeholder="Image URL"
              onChange={handleChange}
              value = {projectDetails.image}
            />
          </div>
          </div>
          <div id = "inline">
          <div className = "field">
            <label htmlFor="isOpen">Project Status:    </label>
            <select 
            className = "input" 
            type="select" 
            id="is_open" 
            onChange={handleChange}
            value = {projectDetails.is_open}
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
          <div className = "field">
            <label htmlFor="category">Category:    </label>
            <select
            className = "input"
              type="select"
              id="category"
              onChange={handleChange}
              value = {projectDetails.category}
            >
              <option value="Energy/Resources">Energy/Resources</option>
              <option value="Water Quality">Water Quality </option>
              <option value="Waste/Contamination">Waste/Contamination</option>
              <option value="Community Conservation">Community Conservation</option>
              <option value="Social Sustainability">Social Sustainability </option>
            </select>
          </div>
          </div>

          <hr />

          <button className = "submit-button" type="submit" onClick={handleSubmit}>
            Submit
          </button>
          </form>


          </div>

      );
    
}

export default EditForm;