import React, { useMemo, useState } from "react";
import "./index.scss";
import {
    likePost,
    getLikesByUser,
    postComment,
    getComments,
} from "../../../API/FirestoreAPI";
import { BiLike, BiSolidLike, BiSolidCommentDots } from "react-icons/bi";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";

export default function LikeButton({ userId, postId, currentUser }) {
    const [likesCount, setLikesCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [showCommentBox, setshowCommentBox] = useState(false);
    const [comment, setComment] = useState("");
    const [showComments, setShowComments] = useState([]);

    const getComment = (event) => {
        setComment(event.target.value);
    };

    const handleLike = () => {
        likePost(userId, postId, liked);
    };

    const uploadComment = () => {
        postComment(
            postId,
            userId,
            comment,
            getCurrentTimeStamp("LL LTS"),
            currentUser?.name
        );
        setComment("");
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter" && comment.trim() !== "") {
            uploadComment();
        }
    };

    useMemo(() => {
        getLikesByUser(userId, postId, setLiked, setLikesCount);
        getComments(postId, setShowComments);
    }, [userId, postId]);

    const orderedComments = useMemo(() => {
        return showComments
            .slice()
            .sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp));
    }, [showComments]);

    return (
        <div className="like-container">
            <p>{likesCount} people like this post</p>

            <div className="hr-line">
                <hr />
            </div>

            <div className="like-comment-common">
                <div className="likes-comment-inner" onClick={handleLike}>
                    {liked ? (
                        <BiSolidLike className="purple" size={30} />
                    ) : (
                        <BiLike className="black" size={30} />
                    )}
                    <p className={liked ? "purple" : "black"}>Like</p>
                </div>
                <div
                    className="likes-comment-inner"
                    onClick={() => setshowCommentBox(!showCommentBox)}
                >
                    <BiSolidCommentDots
                        className={showCommentBox ? "purple" : "black"}
                        size={30}
                    />
                    <p className={showCommentBox ? "purple" : "black"}>
                        Comments
                    </p>
                </div>
            </div>
            {showCommentBox ? (
                <>
                    {orderedComments.length > 0 ? (
                        orderedComments.map((comment, index) => (
                            <div className="comment-preview" key={index}>
                                <div className="comment-header">
                                    <p className="comment-name">
                                        {comment.name}
                                    </p>
                                    <span className="dot">•</span>
                                    <p className="comment-timestamp">
                                        {comment.timeStamp}
                                    </p>
                                </div>
                                <p className="comment-text">
                                    {comment.comment}
                                </p>
                            </div>
                        ))
                    ) : (
                        <></>
                    )}

                    <input
                        onChange={getComment}
                        onKeyPress={handleKeyPress} // Listen for Enter key press
                        name="comment"
                        placeholder="Add a Comment"
                        className="comment-input"
                        value={comment}
                    ></input>
                    <button
                        className="comment-btn"
                        onClick={uploadComment}
                        type="primary"
                        disabled={comment.length > 0 ? false : true}
                    >
                        Comment
                    </button>
                </>
            ) : (
                <></>
            )}
        </div>
    );
}
