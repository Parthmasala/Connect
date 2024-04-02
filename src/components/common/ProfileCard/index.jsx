import React, {useState, useMemo, useEffect} from "react";
import { getStatus } from '../../../API/FirestoreAPI';
import {getSingleStatus , getSingleUser, editProfile} from "../../../API/FirestoreAPI";
import PostsCard from "../PostsCard";
import { useLocation } from "react-router-dom";
import { uploadImage as uploadImageAPI} from "../../../API/ImageUpload";
import ProfileUploadModal from "../ProfileUploadModal";
import "./index.scss";

export default function ProfileCard({ onEdit, currentUser }) {
    let location = useLocation();
    const [allStatuses , setAllStatus] = useState([]);
    const [currentProfile , setCurrentProfile] = useState({});
    const [currentImage, setCurrentImage] = useState({});
    const [modalOpen , setModalOpen] = useState(false);
    const [progress, setProgress] = useState(0);
    const getImage = (event) => {
        setCurrentImage(event.target.files[0]);
    };

    const uploadImage = () => {
        uploadImageAPI(currentImage, currentUser.userid ,setModalOpen , setProgress , setCurrentImage);
 
    };

    useMemo(() => {
        if(location?.state?.id){
            getSingleStatus(setAllStatus , location?.state?.id);
        }
        if(location?.state?.email){
            getSingleUser(setCurrentProfile , location?.state?.email);
        }
        
    } , []);
    
    return (
        <>
            <ProfileUploadModal 
            getImage={getImage} 
            uploadImage={uploadImage} 
            modalOpen={modalOpen} 
            setModalOpen={setModalOpen}
            currentImage={currentImage}
            progress={progress}
            />
            <div className="profile-card">
               {(location?.state?.id == currentUser.userid) &&
                    (<div className="edit-btn">
                    <button onClick={onEdit}>Edit</button>
                </div>)}

                <div className="profile-info">
                    <div>
                        <img className = "profile-image" 
                        onClick={() => {
                            if (location?.state?.id == currentUser.userid) {
                                setModalOpen(true);
                            }
                        }}

                        src ={
                            Object.values(currentProfile).length == 0
                            ? currentUser.imageLink
                            : currentProfile?.imageLink
                        } 
                        alt="profile-image"/>


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
                    (currentProfile.skills != "" || currentProfile.aboutme != "")
                    ?
                    <div className="extra-info">
                    <p className="aboutme">{Object.values(currentProfile).length == 0
                        ? currentUser.aboutme
                        : currentProfile?.aboutme}
                    </p>
                    <p className="skills">
                        {
                            (location?.state?.id === currentUser.userid) ? (
                                (currentUser.skills) ? (
                                    <>
                                        <span className="skills-label">Skills : </span>
                                        &nbsp;{currentUser.skills}
                                    </>
                                ) : null
                            ) : (
                                (currentProfile.skills) ? (
                                    <>
                                        <span className="skills-label">Skills : </span>
                                        &nbsp;{currentProfile.skills}
                                    </>
                                ) : null
                            )
                        }
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