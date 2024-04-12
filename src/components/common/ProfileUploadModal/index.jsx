import React from "react";
import { Button, Modal, Progress } from "antd";
import "./index.scss";
import { useLocation } from "react-router-dom";
import usericon from "../../../assets/user-icon.png";
export default function ProfileUploadModal({
    modalOpen,
    setModalOpen,
    getImage,
    uploadImage,
    currentImage,
    progress,
    currentUser,
    currentProfile,
}) {
    let location = useLocation();
    const renderFooter = () => {
        // if (currentProfile && currentUser && currentProfile.id === currentUser.id) {
        if (location?.state?.id == currentUser.userid) {
            return (
                <Button
                    disabled={!currentImage.name}
                    key='submit'
                    type='primary'
                    onClick={uploadImage}
                >
                    Upload Profile Picture
                </Button>
            );
        }
        return null;
    };

    const profileImageSrc =
        currentProfile && currentUser && currentProfile.id === currentUser.id
            ? currentUser.imageLink
            : currentProfile
            ? currentProfile.imageLink
            : "../../../assets/user-icon.png";

    return (
        <Modal
            title='Profile Image'
            centered
            visible={modalOpen}
            onOk={() => setModalOpen(false)}
            onCancel={() => setModalOpen(false)}
            footer={renderFooter()}
        >
            <div className='user-profile-pic'>
                <img
                    className='post-image'
                    src={profileImageSrc}
                    alt='no-image-available'
                />
            </div>
            {/* {currentProfile && currentUser && currentProfile.id === currentUser.id && ( */}
            {location?.state?.id == currentUser.userid && (
                <div className='image-upload-main'>
                    <p>{currentImage.name}</p>
                    <label className='upload-btn' htmlFor='image-upload'>
                        Add an Image
                    </label>
                    {progress !== 0 && (
                        <div className='progress-bar'>
                            <Progress type='circle' percent={progress} />
                        </div>
                    )}
                    <input
                        hidden
                        id='image-upload'
                        type='file'
                        onChange={getImage}
                    />
                </div>
            )}
        </Modal>
    );
}
