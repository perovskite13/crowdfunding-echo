import React, {useState, useEffect, useContext} from "react";
import {useHistory} from "react-router-dom";
import {getStorage, isAuthenticated, setStorage} from "../../helpers/localStorage";


function PostForm(){
    //variables
    //const Today = React.createContext(CalendarDate.today());

    const[projectDetails,setProjectDetails] = useState({
        title : "",
        description : "Describe your project ideas",
        goal : 0,
        image : "",
        is_open : true,
        category : "",
        date_created: "2020-03-20T14:28:23.382748Z"
    });

    const history = useHistory();

  //   useEffect(() =>
  //   fetch(`${process.env.REACT_APP_API_URL}echo/:id`
  //     .then(res => res.json())
  //     .then(res => this.setProjectDetails({ title: res }))
  //     .then(res => this.setProjectDetails({ description: res }))
  //     .then(res => this.setProjectDetails({ goal: res }))
  //     .then(res => this.setProjectDetails({ isOpen: res }))
  //     .then(res => this.setProjectDetails({ category: res }))
  // ));

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
        const response = await fetch(`${process.env.REACT_APP_API_URL}echo/`,{
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`,
            },
            body: JSON.stringify(projectDetails),
        });
        return response.json();
    };

    //get token
    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            projectDetails.title &&
            projectDetails.description &&
            projectDetails.goal &&
            projectDetails.image &&
            projectDetails.is_open &&
            projectDetails.category
        ) {
          postData(isAuthenticated()).then(res => {
            setStorage("title",projectDetails.title);
            console.log(res)
            history.push( `/echo/${res.id}`)
          });
        }
    }

    
    //template
    return (
      
      <div>
        <form className = "create">
        <h1>Create A Project</h1>
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
            />
          </div>
          </div>
          <div id = "inline">
          <div className = "field">
            <label htmlFor="isOpen">Project Status:    </label>
            <select 
            className = "input" 
            type="select" 
            id="isOpen" 
            onChange={handleChange}>
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
            Create
          </button>
          </form>


          </div>

      );
    
}

export default PostForm;