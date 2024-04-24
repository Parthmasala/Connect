import React, { useEffect, useState } from "react";
import { Button, Modal, Progress } from "antd";
import "./index.scss";
import usericon from "../../../assets/user-icon.png";
import { useNavigate } from "react-router-dom";

export default function FollowersModal({
    currentUser,
    showFollowers,
    setShowFollowers,
    followers,
}) {
    // console.log(followers);
    // console.log(currentUser);

    const navigate = useNavigate();

    const openUser = (user) => {
        navigate("/profile", {
            state: {
                id: user?.id,
                email: user?.email,
            },
        });
        window.location.reload();
    };
    return (
        <Modal
            title="People who follow you"
            open={showFollowers}
            onOk={() => {
                setShowFollowers(false);
            }}
            onCancel={() => setShowFollowers(false)}
        >
            <div className="followers-results">
                {followers.length === 0 ? (
                    <div className="followers-inner">No results</div>
                ) : (
                    followers.map((user) => (
                        <div
                            className="followers-inner"
                            onClick={() => {
                                openUser(user), setShowFollowers(false);
                            }}
                        >
                            {/* <img
                                src={usericon || user?.imageLink}
                                alt={user.name}
                            /> */}
                            <p className="name">{user?.name}</p>
                        </div>
                    ))
                )}
            </div>
        </Modal>
    );
}
