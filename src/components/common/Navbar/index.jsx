import React, { useState, useEffect, useRef } from 'react';
import './index.scss';
import ConnectLogo from '../../../assets/ConnectLogo.png';
import usericon from '../../../assets/user-icon.png';
import { IoMdHome, IoIosBriefcase, IoMdNotifications } from 'react-icons/io';
import { FaUserPlus, FaSearch, FaComments } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ProfilePopup from '../ProfilePopup';

export default function Navbar({ currentUser }) {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const userLogoRef = useRef(null);

  const Route = (path) => {
    navigate(path);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (userLogoRef.current && !userLogoRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar-master">
      <img className="connect-logo" src={ConnectLogo} alt="Connect Logo" onClick={() => Route('/home')} />
      <div className="icons">
        <IoMdHome size={40} className="icon-scss" onClick={() => Route('/Home')} />
        <FaUserPlus size={30} className="icon-scss" onClick={() => Route('/Connections')} />
        <IoIosBriefcase size={40} className="icon-scss" onClick={() => Route('/Jobs')} />
        <FaSearch size={30} className="icon-scss" onClick={() => Route('/Search')} />
        <FaComments size={30} className="icon-scss" onClick={() => Route('/Messages')} />
        <IoMdNotifications size={40} className="icon-scss" onClick={() => Route('/Notifications')} />
      </div>
      <div ref={userLogoRef} onClick={() => setShowPopup(!showPopup)}>
        <img className="user-logo" src={usericon} alt="User Icon" />
        {showPopup && <ProfilePopup currentUser={currentUser} />}
      </div>
    </div>
  );
}
