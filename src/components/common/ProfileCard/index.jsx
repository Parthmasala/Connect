import React, { useState, useMemo, useEffect } from "react";
import {
    getStatus,
    getConnections,
    getSingleStatus,
    getSingleUser,
    editProfile,
    addConnection,
    removeConnection,
} from "../../../API/FirestoreAPI";
import { deleteAccount } from "../../../API/AuthAPI";
import PostsCard from "../PostsCard";
import { useLocation } from "react-router-dom";
import {
    uploadImage as uploadImageAPI,
    deleteImage as deleteImageAPI,
} from "../../../API/ImageUpload"; // Import deleteImage function
import ProfileUploadModal from "../ProfileUploadModal";
import { Modal } from "antd";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import usericon from "../../../assets/user-icon.png";

export default function ProfileCard({ onEdit, currentUser }) {
    let location = useLocation();
    let navigate = useNavigate();
    const [allStatuses, setAllStatus] = useState([]);
    const [currentProfile, setCurrentProfile] = useState({});
    const [currentImage, setCurrentImage] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isConnected, setIsConnected] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

    const getImage = (event) => {
        setCurrentImage(event.target.files[0]);
    };

    const uploadImage = () => {
        uploadImageAPI(
            currentImage,
            currentUser.userid,
            setModalOpen,
            setProgress,
            setCurrentImage
        );
    };

    // Function to delete the current profile image
    const deleteCurrentImage = () => {
        deleteImageAPI(
            currentUser.userid,
            () => setCurrentImage({}), // Clear current image state
            () => setCurrentProfile({ ...currentProfile, imageLink: "" }) // Update currentProfile state to remove imageLink
        );
    };

    useMemo(() => {
        if (location?.state?.id) {
            getSingleStatus(setAllStatus, location?.state?.id);
        }
        if (location?.state?.email) {
            getSingleUser(setCurrentProfile, location?.state?.email);
        }
    }, []);

    useEffect(() => {
        getConnections(currentUser.userid, location?.state?.id, setIsConnected);
    }, [currentUser.userid, location?.state?.id]);

    const getCurrentUser = (id) => {
        addConnection(currentUser?.userid, id);
    };

    const removeCurrentUser = (id) => {
        removeConnection(currentUser?.userid, id);
    };

    const handleClick = (event) => {
        event.preventDefault();

        if (event.target.classList.contains("message-button")) {
            navigate("/messages", {
                state: {
                    messengerId: location?.state?.id,
                    messengerEmail: location?.state?.email,
                },
            });
        }
    };

    const handleDeleteAccount = () => {
        deleteAccount(currentUser.userid)
            .then(() => {
                navigate("/signup");
                localStorage.clear();
            })
            .catch((error) => {
                console.error("Error deleting account:", error);
            });
    };

    return (
        <>
            <ProfileUploadModal
                getImage={getImage}
                uploadImage={uploadImage}
                deleteImage={deleteCurrentImage} // Pass deleteImage function
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                currentImage={currentImage}
                progress={progress}
                currentUser={currentUser}
                currentProfile={currentProfile}
            />

            <div className='profile-card'>
                {location?.state?.id == currentUser.userid && (
                    <div className='edit-btn'>
                        <button onClick={onEdit}>Edit</button>
                    </div>
                )}

                <div className='profile-info'>
                    <div>
                        <img
                            className='profile-image'
                            onClick={() => {
                                // if (location?.state?.id == currentUser.userid) {
                                setModalOpen(true);
                                // }
                            }}
                            src={
                                currentProfile.imageLink ||
                                currentUser.imageLink ||
                                usericon
                            }
                            alt='profile-image'
                        />

                        <h3 className='userName'>
                            {Object.values(currentProfile).length == 0
                                ? currentUser.name
                                : currentProfile?.name}
                        </h3>
                        <p className='heading'>
                            {Object.values(currentProfile).length == 0
                                ? currentUser.headline
                                : currentProfile?.headline}
                        </p>
                        <p className='location'>
                            {Object.values(currentProfile).length === 0
                                ? currentUser.city && currentUser.country
                                    ? `${currentUser.city}, ${currentUser.country}`
                                    : currentUser.city ||
                                      currentUser.country ||
                                      ""
                                : currentProfile.city && currentProfile.country
                                ? `${currentProfile.city}, ${currentProfile.country}`
                                : currentProfile.city ||
                                  currentProfile.country ||
                                  ""}
                        </p>

                        <a
                            className='website'
                            target='_blank'
                            href={
                                Object.values(currentProfile).length == 0 ||
                                !currentProfile.website
                                    ? currentUser.website
                                    : currentProfile.website
                            }
                        >
                            {Object.values(currentProfile).length == 0 ||
                            !currentProfile.website
                                ? currentUser.website
                                : currentProfile.website}
                        </a>
                    </div>

                    <div className='right-info'>
                        {location?.state?.id !== currentUser.userid ? (
                            <>
                                {isConnected ? (
                                    <>
                                        <button
                                            className='unfollow-button'
                                            onClick={() =>
                                                removeCurrentUser(
                                                    location?.state?.id
                                                )
                                            }
                                        >
                                            Unfollow
                                        </button>
                                        <button
                                            className='message-button'
                                            onClick={handleClick}
                                        >
                                            Message
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        className='connect-button'
                                        onClick={() =>
                                            getCurrentUser(location?.state?.id)
                                        }
                                    >
                                        Follow
                                    </button>
                                )}
                            </>
                        ) : (
                            <></>
                        )}
                        <p className='college'>
                            {Object.values(currentProfile).length == 0
                                ? currentUser.college
                                : currentProfile?.college}
                        </p>
                        <p className='company'>
                            {Object.values(currentProfile).length == 0
                                ? currentUser.company
                                : currentProfile?.company}
                        </p>
                    </div>
                </div>
                {
                    //only when skills or aboutme is present otherwise there is horizontal line
                    currentProfile.skills != "" ||
                    currentProfile.aboutme != "" ? (
                        <div className='extra-info'>
                            <p className='aboutme'>
                                {Object.values(currentProfile).length == 0
                                    ? currentUser.aboutme
                                    : currentProfile?.aboutme}
                            </p>
                            <p className='skills'>
                                {location?.state?.id === currentUser.userid ? (
                                    currentUser.skills ? (
                                        <>
                                            <span className='skills-label'>
                                                Skills :{" "}
                                            </span>
                                            &nbsp;{currentUser.skills}
                                        </>
                                    ) : null
                                ) : currentProfile.skills ? (
                                    <>
                                        <span className='skills-label'>
                                            Skills :{" "}
                                        </span>
                                        &nbsp;{currentProfile.skills}
                                    </>
                                ) : null}
                            </p>
                            <div className='delete-modal'>
                                {location?.state?.id == currentUser.userid && (
                                    <div className='delete-btn'>
                                        <button
                                            className='delete-account-button'
                                            onClick={() =>
                                                setConfirmDeleteOpen(true)
                                            }
                                        >
                                            Delete Account
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )
                }
            </div>

            <div className='post-status-parent'>
                {allStatuses?.map((posts) => {
                    return (
                        <div key={posts.id}>
                            <PostsCard posts={posts} />
                        </div>
                    );
                })}
            </div>

            {/* Delete account confirmation modal */}
            <Modal
                title='Confirm Delete Account'
                visible={confirmDeleteOpen}
                onOk={() => {
                    handleDeleteAccount();
                    setConfirmDeleteOpen(false);
                }}
                onCancel={() => setConfirmDeleteOpen(false)}
            >
                <p>Are you sure you want to delete your account?</p>
            </Modal>
        </>
    );
}
