import React, { useEffect, useState } from "react";
import { Button, Modal, Progress } from "antd";
import "./index.scss";
import usericon from "../../../assets/user-icon.png";
import { useNavigate } from "react-router-dom";

export default function FollowingModal({
    currentUser,
    showFollowing,
    setShowFollowing,
    following,
}) {
    console.log(following);

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
            title="People whom you follow"
            open={showFollowing}
            onOk={() => {
                setShowFollowing(false);
            }}
            onCancel={() => setShowFollowing(false)}
        >
            <div className="following-results">
                {following.length === 0 ? (
                    <div className="following-inner">No results</div>
                ) : (
                    following.map((user) => (
                        <div
                            className="following-inner"
                            onClick={() => {
                                openUser(user), setShowFollowing(false);
                            }}
                        >
                            <img
                                src={user?.imageLink || usericon}
                                alt={user.name}
                            />
                            <p className="name">{user?.name}</p>
                        </div>
                    ))
                )}
            </div>
        </Modal>
    );
}
