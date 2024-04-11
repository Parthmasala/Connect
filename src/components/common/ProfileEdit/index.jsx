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
            country: currentUser.country || "",
            city: currentUser.city || "",
            company: currentUser.company || "",
            college: currentUser.college || "",
            industry: currentUser.industry || "",
            website: currentUser.website || "",
            skills: currentUser.skills || "",
            aboutme: currentUser.aboutme || "",
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
        <div className='profileEdit'>
            <div className='edit-btn'>
                <button onClick={onEdit}>Back</button>
            </div>
            <div className='profileEditInputs'>
                <label>Name</label>
                <input
                    onChange={getInput}
                    className='common-input'
                    placeholder={currentUser.name ? currentUser.name : "Name"}
                    name='name'
                    value={editInputs.name}
                />
                <label>Headline</label>
                <input
                    onChange={getInput}
                    className='common-input'
                    placeholder={
                        currentUser.headline ? currentUser.headline : "Headline"
                    }
                    name='headline'
                    value={editInputs.headline}
                />
                <label>Country</label>
                <input
                    onChange={getInput}
                    className='common-input'
                    placeholder={
                        currentUser.country ? currentUser.country : "Country"
                    }
                    name='country'
                    value={editInputs.country}
                />
                <label>City</label>
                <input
                    onChange={getInput}
                    className='common-input'
                    placeholder={currentUser.city ? currentUser.city : "City"}
                    name='city'
                    value={editInputs.city}
                />
                <label>Company</label>
                <input
                    onChange={getInput}
                    className='common-input'
                    placeholder={
                        currentUser.company ? currentUser.company : "Company"
                    }
                    name='company'
                    value={editInputs.company}
                />
                <label>Industry</label>
                <input
                    onChange={getInput}
                    className='common-input'
                    placeholder={
                        currentUser.industry ? currentUser.industry : "Industry"
                    }
                    name='industry'
                    value={editInputs.industry}
                />
                <label>College</label>
                <input
                    onChange={getInput}
                    className='common-input'
                    placeholder={
                        currentUser.college ? currentUser.college : "College"
                    }
                    name='college'
                    value={editInputs.college}
                />

                <label>Website</label>
                <input
                    onChange={getInput}
                    className='common-input'
                    placeholder={
                        currentUser.website ? currentUser.website : "Website"
                    }
                    name='website'
                    value={editInputs.website}
                />

                <label>Skills</label>
                <input
                    onChange={getInput}
                    className='common-input'
                    placeholder={
                        currentUser.skills ? currentUser.skills : "Skill"
                    }
                    name='skills'
                    value={editInputs.skills}
                />

                <label>About</label>
                <textarea
                    className='common-textArea'
                    onChange={getInput}
                    placeholder={
                        currentUser.aboutme ? currentUser.aboutme : "About Me"
                    }
                    name='aboutme'
                    value={editInputs.aboutme}
                />
            </div>
            <button className='save-btn' onClick={updateProfileData}>
                Save
            </button>
        </div>
    );
}
