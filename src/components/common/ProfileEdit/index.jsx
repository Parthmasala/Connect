import React, { useState, useEffect } from "react";
import { editProfile } from "../../../API/FirestoreAPI";
import "./index.scss";

export default function ProfileEdit({ currentUser, onEdit }) {
  const [editInputs, setEditInputs] = useState({});

  useEffect(() => {
    // Populate the editInputs state with the currentUser data when it changes
    setEditInputs({
      name: currentUser.name || "",
      headline: currentUser.headline || "",
      location: currentUser.location || "",
      company: currentUser.company || "",
      college: currentUser.college || "",
    });
  }, [currentUser]);

  const getInput = (event) => {
    let { name, value } = event.target;
    let input = { [name]: value };
    setEditInputs({ ...editInputs, ...input });
  };

  const updateProfileData = async () => {
    await editProfile(currentUser?.userid, editInputs);
    await onEdit();
  };

  return (
    <div className="profileEdit">
      <div className="edit-btn">
        <button onClick={onEdit}>Back</button>
      </div>
      <div className="profileEditInputs">
        <input
          onChange={getInput}
          className="common-input"
          placeholder={currentUser.name ? currentUser.name : "Name"}
          name="name"
          value={editInputs.name} 
        />
        <input
          onChange={getInput}
          className="common-input"
          placeholder={currentUser.headline ? currentUser.headline : "Headline"}
          name="headline"
          value={editInputs.headline} 
        />
        <input
          onChange={getInput}
          className="common-input"
          placeholder={currentUser.location ? currentUser.location : "Location"}
          name="location"
          value={editInputs.location} 
        />
        <input
          onChange={getInput}
          className="common-input"
          placeholder={currentUser.company ? currentUser.company : "Company"}
          name="company"
          value={editInputs.company} 
        />
        <input
          onChange={getInput}
          className="common-input"
          placeholder={currentUser.college ? currentUser.college : "College"}
          name="college"
          value={editInputs.college} 
        />
      </div>
      <button className="save-btn" onClick={updateProfileData}>
        Save
      </button>
    </div>
  );
}
