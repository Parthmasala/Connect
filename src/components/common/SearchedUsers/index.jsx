import React from 'react';
import './index.scss';
import usericon from '../../../assets/dummy-image.png'

export default function SearchedUsers({ user}) {

    return (

        <div className="searched-user">
            <img src={user.imageLink || usericon} alt={user.name} 
                style={{ color : 'black' }}
            />
            <div className="user-details">
                <p className="name">{user.name}</p>
                <p className="headline">{user.headline}</p>
            </div>
            
        </div>

    );
}
