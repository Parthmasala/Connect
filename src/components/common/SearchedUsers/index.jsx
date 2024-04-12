import React, { useState, useEffect } from "react";
import "./index.scss";
import usericon from "../../../assets/dummy-image.png";
import { getConnections } from "../../../API/FirestoreAPI";
import { useNavigate } from "react-router-dom";

export default function SearchedUsers({ user, getCurrentUser, currentUser }) {
    let navigate = useNavigate();

    const handleClick = () => {
        console.log(user.id, user.email);
        navigate("/profile", {
            state: { id: user.id, email: user.email },
        });
    };

    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        getConnections(currentUser.userid, user.id, setIsConnected);
    }, [currentUser.userid, user.id]);

    return !isConnected ? (
        <div className="searched-user" onClick={handleClick}>
            <img
                src={user.imageLink || usericon}
                alt={user.name}
                style={{ color: "black" }}
            />
            <div className="user-details">
                <p className="name">{user.name}</p>
                <p className="headline">{user.headline}</p>
            </div>

            <button
                className="connect-button"
                onClick={() => getCurrentUser(user.id)}
            >
                Connect
            </button>
        </div>
    ) : (
        <div className="searched-user" onClick={handleClick}>
            <img
                src={user.imageLink || usericon}
                alt={user.name}
                style={{ color: "black" }}
            />
            <div className="user-details">
                <p className="name">{user.name}</p>
                <p className="headline">{user.headline}</p>
            </div>
        </div>
    );
}
