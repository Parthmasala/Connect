import React, {useState} from "react";
import { editProfile } from "../../../API/FirestoreAPI";
import "./index.scss";

export default function ProfileEdit({currentUser, onEdit}) {
    const [editInputs, setEditInputs] = useState({});
    const getInput = (event) => {
        let {name, value} = event.target;
        let input = {[name] : value};
        setEditInputs({...editInputs, ...input});
    };

    const updateProfileData = async () => {
        await editProfile(currentUser?.userid, editInputs);
        await onEdit();
        // console.log(currentUser?.userid);
    }

    // console.log(editInputs);
    return (<div className="profileEdit">
        <div className="edit-btn">
            <button onClick={onEdit}>GO back</button>
            
        </div>
        <div className="profieEditInputs">

            <input onChange={getInput}  className="common-input"  placeholder="Name" name = "name"></input>
            <input onChange={getInput}  className="common-input" placeholder="Headline" name = "headline"></input>
            <input onChange={getInput}  className="common-input" placeholder="Location" name = "location"></input>
            <input onChange={getInput}  className="common-input" placeholder="Company" name = "company"></input>
            <input onChange={getInput}  className="common-input" placeholder="College" name = "college"></input>

        </div>
        <button className="save-btn" onClick={updateProfileData}>
            Save
        </button>
        
    </div>)
}