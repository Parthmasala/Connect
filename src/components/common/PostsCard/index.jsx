import React, { useMemo, useState } from 'react'
import "./index.scss"
import { useNavigate } from 'react-router-dom'
import {getCurrentUser , getAllUsers} from '../../../API/FirestoreAPI'
import LikeButton from '../LikeButton';

export default function PostsCard({posts , id}){
    let navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({});
    const [allUsers, setAllUsers] = useState([]);
    useMemo(()=>{
        getCurrentUser(setCurrentUser);
        getAllUsers(setAllUsers)
    }, [])
    // console.log();
    // console.log(posts);
    return (
        <div className='posts-card' key={id}>
            <div className='post-header'>
                <img src={
                    allUsers.filter((item) => item.id === posts.userID).map((item) => item.imageLink)[0]
                } alt="profile image" style={{ color: 'black' , fontSize : '11px'
                }} className='user-profile' onClick={() => navigate('/profile' , {
                    state : {id : posts?.userID , email:posts.userEmail},
                })}/>
                
                <div className='name-timestamp'>
                    <p className='name' 
                    onClick={() => navigate('/profile' , {
                        state : {id : posts?.userID , email:posts.userEmail},
                    })}>
                        
                        {posts.userName}</p>
                    <p className='timeStamp'> {posts.timeStamp}</p>
                </div>
                </div>
            <p className='status'>
                {posts.status}
            </p>
            <LikeButton userId={currentUser?.userid} postId={posts.id} currentUser={currentUser}/>
        </div>
        )
}