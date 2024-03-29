import React, { useMemo, useState } from "react";
import "./index.scss";
import { likePost, getLikesByUser } from "../../../API/FirestoreAPI";
import { BiLike, BiSolidLike } from "react-icons/bi";

export default function LikeButton({userId, postId}) {
    const [likesCount, setLikesCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const handleLike = () => {
        likePost(userId, postId, liked);
    }
    // console.log(liked);

    useMemo(() =>{
        getLikesByUser(userId, postId, setLiked, setLikesCount);
    }, [userId, postId]);
    return (
        <div className="like-container" onClick={handleLike}> 
            <p>
                {likesCount} people like this post
            </p>

            <div className="hr-line">
                <hr /> 
            </div>
            <div className="likes-inner">
                {liked ? <BiSolidLike color = 'purple' size = {30}/> : <BiLike color = 'black' size = {30}  />}
                <p className = {liked ? "purple" : "black"}>Like</p>
            </div>
            
        </div>
    );
}