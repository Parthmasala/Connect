import React, { useState, useEffect } from "react";
import { getConnections } from "../../../API/FirestoreAPI";
import usericon from "../../../assets/dummy-image.png";

export default function ConnectedUsers({ user, getCurrentUser, currentUser, removeCurrentUser }) {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        getConnections(currentUser.userid, user.id, setIsConnected);
    }, [currentUser.userid, user.id]);

    return  (
        <div className='connected-user'>
            <img
                src={user.imageLink || usericon}
                alt={user.name}
                style={{ color: "black" }}
            />
            <div className='user-details'>
                <p className='name'>{user.name}</p>
                <p className='headline'>{user.headline}</p>
            </div>

            {!isConnected?
            (<button
                className='connect-button'
                onClick={() => getCurrentUser(user.id)}
            >
                Connect
            </button>):
            (<button
                className='unfollow-button'
                onClick={() => removeCurrentUser(user.id)}
            >
                unfollow
            </button>)}
        </div>
    ) 
}
