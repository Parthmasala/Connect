import React, { useMemo, useState } from 'react'
import "./index.scss"
import { useNavigate } from 'react-router-dom'
import {getCurrentUser} from '../../../API/FirestoreAPI'
import LikeButton from '../LikeButton';

export default function PostsCard({posts , id}){
    let navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({});
    useMemo(()=>{
        getCurrentUser(setCurrentUser);
    }, [])
    // console.log(currentUser);
    // console.log(posts);
    return (
        <div className='posts-card' key={id}>
            <p className='name' 
            onClick={() => navigate('/profile' , {
                state : {id : posts?.userID , email:posts.userEmail},
            })}>
                
                {posts.userName}</p>
            <p className='timeStamp'> {posts.timeStamp}</p>
            <p className='status'>
                {posts.status}
            </p>
            <LikeButton userId={currentUser?.userid} postId={posts.id} currentUser={currentUser}/>
        </div>
        )
}