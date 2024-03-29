import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../../API/FirestoreAPI";
import Button from "../Button";
import "./index.scss";
import {onLogout} from "../../../API/AuthAPI";

export default function ProfilePopup() {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  const onViewProfile = () => {
    navigate('/profile' , {
      state : {id : currentUser?.userID , email:currentUser.userEmail},
  });
    window.location.reload();
  };
  // console.log(currentUser);
  return (
    <div className="popup-card">
      <p className="name">{currentUser?.name}</p>
      <p className="headline">{currentUser?.headline}</p>
      <Button
        title="View Profile"
        onClick={onViewProfile} 
      />
      <Button title="Logout" onClick={onLogout} />

    </div>
  );
}