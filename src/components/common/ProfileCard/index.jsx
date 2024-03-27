import React, {useState, useMemo} from "react";
// import { getStatus } from '../../../API/FirestoreAPI';
import {getSingleStatus , getSingleUser} from "../../../API/FirestoreAPI";
import PostsCard from "../PostsCard";
import { useLocation } from "react-router-dom";
import "./index.scss";

export default function ProfileCard({ onEdit, currentUser }) {
    let location = useLocation();
    const [allStatuses , setAllStatus] = useState([]);
    const [currentProfile , setCurrentProfile] = useState({});

    useMemo(() => {
        if(location?.state?.id){
            getSingleStatus(setAllStatus , location?.state?.id);
        }
        if(location?.state?.email){
            getSingleUser(setCurrentProfile , location?.state?.email);
        }
        
    } , []);
    console.log(currentProfile);
    return (
        <>
            <div className="profile-card">
                
                {(currentProfile.userID == currentUser.userID) &&
                    <div className="edit-btn">
                    <button onClick={onEdit}>Edit</button>
                </div>}

                <div className="profile-info">
                    <div>
                        <h3 className="userName">
                            {Object.values(currentProfile).length == 0
                            ? currentUser.name
                            : currentProfile?.name}    
                        </h3>
                        <p className="heading">
                        {Object.values(currentProfile).length == 0
                            ? currentUser.headline
                            : currentProfile?.headline} 
                        </p>
                        <p className="location">
                        {Object.values(currentProfile).length == 0
                            ? `${currentUser.city}, ${currentUser.country}`
                            : `${currentUser.city}, ${currentUser.country}`}
                        </p>
                        <a className="website" 
                            target="_blank"
                            href={Object.values(currentProfile).length == 0
                            ? `${currentUser.website}`
                            : currentProfile?.website}>
                        {Object.values(currentProfile).length == 0
                            ? `${currentUser.website}`
                            : currentProfile?.website}
                        </a>
                    </div>

                    <div className="right-info">
                        <p className="college">{Object.values(currentProfile).length == 0
                            ? currentUser.college
                            : currentProfile?.college}
                        </p>
                        <p className="company">
                        {Object.values(currentProfile).length == 0
                            ? currentUser.company
                            : currentProfile?.company}
                        </p>
                    </div>
                </div>
                {
                    //only when skills or aboutme is present otherwise there is horizontal line
                    (currentProfile.skills || currentProfile.aboutme )
                    ?
                    <div className="extra-info">
                    <p className="aboutme">{Object.values(currentProfile).length == 0
                        ? currentUser.aboutme
                        : currentProfile?.aboutme}
                    </p>
                    <p className="skills">
                        {
                        //only when skills is present otherwise there is Bold Skills
                        currentProfile.skills ? 
                         <span className="skills-label">Skills : </span> : 
                         <></>
                        }
                        &nbsp;{Object.values(currentProfile).length == 0
                        ? currentUser.skills
                        : currentProfile?.skills}
                    </p>
                </div> :
                <></>
                }
            </div>

            <div className="post-status-parent">
                {allStatuses?.map((posts) => {
                return (
                    <div key={posts.id}>
                    <PostsCard posts={posts} />
                    </div>
                );
                })}
            </div>
        </>
        
    );
}