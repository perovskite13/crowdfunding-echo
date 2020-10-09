import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { getStorage } from "../../helpers/localStorage";
import "../LoginForm/Form.css";


function DeleteForm() {
  const history = useHistory();
  const { id } = useParams();

  const deleteData = async () => {
    const token = getStorage("token");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}echo/${id}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      }
    );
  };
  //get token
  const handleSubmit = (e) => {
    e.preventDefault();
    deleteData().then((response) => {
      history.push(`/`);
    });
  };
  //template
  return (
    <div>
      <button className="submit-button" type="submit" onClick={handleSubmit}>
        Delete
      </button>
    </div>
  );
}
export default DeleteForm;