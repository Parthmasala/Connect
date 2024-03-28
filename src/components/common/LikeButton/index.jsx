import React, { useMemo } from "react";
import "./index.scss";
import { likePost } from "../../../API/FirestoreAPI";
import { BiLike } from "react-icons/bi";
import { getLikesByUser } from "../../../API/FirestoreAPI";

export default function LikeButton({userId, postId}) {
    
    const handleLike = () => {
        likePost(userId, postId);
    }

    useMemo(() =>{
        getLikesByUser(userId, postId);
    }, [])
    return (
        <div className="like-container" onClick={handleLike}> 
            <BiLike size = {30} />
            <p>Like</p>
        </div>
    );
}