import React, {useState, useEffect, useContext} from "react";
import {useParams, useHistory} from "react-router-dom";
import {getStorage, isAuthenticated, setStorage} from "../../helpers/localStorage";
// import Switch from 'path/to/Switch'
// import { ReactComponent as OnIcon } from 'path/to/on-icon.svg'
// import { ReactComponent as OffIcon } from 'path/to/off-icon.svg'


function PledgeForm(props){
    const {projectData} = props;
    // console.log({projectData});
    const {id} = useParams();

    const[pledgeDetails,setPledgeDetails] = useState({
        amount : 0,
        comment : "I support!",
        anonymous : false,
        project_id: id
    });
    // console.log({pledgeDetails})
    //const {id} = {projectData.id}
    const history = useHistory();

    //methods
    //set state
    const handleChange = (e)=> {
        const {id, value} = e.target;
        setPledgeDetails((prevPledgeDetails) => ({
            ...prevPledgeDetails,
            [id]: value,
        }));
    };

    // const handleActive = (e)=> {
    //     const {id, value} = e.target;
    //     setPledgeDetails((prevPledgeDetails) => ({
    //         ...prevPledgeDetails,
    //         anonymous = true;
    //     }));
    // };

    const postData = async() => {
        const token = getStorage("token")
        // debugger
        const response = await fetch(`${process.env.REACT_APP_API_URL}pledge/`,{
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`,
            },
            body: JSON.stringify(pledgeDetails),
        });
        return response.json();
    };

    //get token
    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            pledgeDetails.amount > 0
        ) {
          postData(isAuthenticated()).then(res => {
            setStorage("amount",pledgeDetails.amount);
            console.log(res)
            history.push( `/echo/${res.project_id}`)
            setPledgeDetails({
                ...pledgeDetails,
                amount : 0,
                comment : "Drop some hearts and support!",

            })
          });
        }
    }

    
    //template
    return (
      <div>
        <form className = "pledge">
        <h1>Support the Initiative!</h1>
        <hr />
          <div id = "inline">
              <div className = "field">
              <label htmlFor="amount">Pledge Amount:    </label>
              <input
            className = "input"
              type="number"
              id="amount"
              placeholder="How much would you like to contribute?"
              onChange={handleChange}
              value={pledgeDetails.amount}
              />
          </div>
          <div className = "field">
            <label htmlFor="comment">Comment:    </label>
            <input
              className = "input"
              type="text"
              id="comment"
              placeholder="Drop some hearts and support!"
              onChange={handleChange}
              value={pledgeDetails.comment}
            />
          </div>
          {/* <Switch
            label='Show bookmarks bar'
            activeStateIcon={<OnIcon />}
            inactiveStateIcon={<OffIcon />}
            onChange={(isActive) => console.log(`I'm ${isActive ? 'truthy' : 'falsy'}.`)}
            /> */}
          </div>
          <hr />
          <button className = "submit-button" type="submit" onClick={handleSubmit}>
            Support!
          </button>
          </form>
          </div>

      );
    
}

export default PledgeForm;