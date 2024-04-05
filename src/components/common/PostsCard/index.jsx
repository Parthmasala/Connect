import React, { useMemo, useState, useEffect } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { BsPencil, BsTrash } from "react-icons/bs";
import {
  getCurrentUser,
  getAllUsers,
  deletePost,
  getConnections,
} from "../../../API/FirestoreAPI";
import LikeButton from "../LikeButton";

export default function PostsCard({ posts, id, getEditData }) {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);

  useEffect(() => {
    getConnections(currentUser.userid, posts.userID, setIsConnected);
  }, [currentUser.userid, posts.userID]);
  console.log(isConnected);
  return isConnected || currentUser.userid == posts.userID ? (
    <div className='posts-card' key={id}>
      <div className='post-header'>
        <img
          src={
            allUsers
              .filter((item) => item.id === posts.userID)
              .map((item) => item.imageLink)[0]
          }
          alt='profile image'
          style={{ color: "black", fontSize: "11px" }}
          className='user-profile'
          onClick={() =>
            navigate("/profile", {
              state: { id: posts?.userID, email: posts.userEmail },
            })
          }
        />

        <div className='name-timestamp'>
          <p
            className='name'
            onClick={() =>
              navigate("/profile", {
                state: { id: posts?.userID, email: posts?.userEmail },
              })
            }
          >
            {allUsers.filter((user) => user.id === posts.userID)[0]?.name}
          </p>
          <p className='headline'>
            {" "}
            {allUsers.filter((user) => user.id === posts.userID)[0]?.headline}
          </p>
          <p className='timeStamp'> {posts.timeStamp}</p>
        </div>

        {currentUser.userid === posts.userID ? (
          <div className='action-container'>
            <BsPencil
              size={20}
              className='action-icon'
              onClick={() => getEditData(posts)}
            />
            <BsTrash
              size={20}
              className='action-icon'
              onClick={() => deletePost(posts.id)}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      <p className='status'>{posts.status}</p>

      {posts.postImage && (
        <img src={posts.postImage} alt='post-image' className='post-image' />
      )}
      <LikeButton
        userId={currentUser?.userid}
        postId={posts.id}
        currentUser={currentUser}
      />
    </div>
  ) : (
    <></>
  );
}
