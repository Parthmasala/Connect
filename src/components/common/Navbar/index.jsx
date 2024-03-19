import React from 'react';
import "./index.scss";
import ConnectLogo from '../../../assets/ConnectLogo.png';
import usericon from '../../../assets/user-icon.png';
import { IoMdHome ,IoIosBriefcase , IoMdNotifications } from "react-icons/io";
import { FaUserPlus, FaSearch, FaComments } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  let naviagte = useNavigate();
  const Route = (path) => {
    naviagte(path);
  }

  return (
    <div className='navbar-master'>
      <img className='connect-logo' src={ConnectLogo} alt="Connect Logo" />
      <div className='icons'>
        <IoMdHome size={40} className='icon-scss' 
          onClick={ () => Route("/Home")} 
        />
        <FaUserPlus size={30} className='icon-scss'
          onClick={ () => Route("/Connections")}
        />
        <IoIosBriefcase size={40} className='icon-scss'
          onClick={ () => Route("/Jobs")}
        />
        <FaSearch size={30} className='icon-scss'
          onClick={ () => Route("/Search")}
        />
        <FaComments size={30} className='icon-scss'
          onClick={ () => Route("/Messages")}
        />
        <IoMdNotifications size={40} className='icon-scss'
          onClick={ () => Route("/Notifications")}
        />
      </div>
      <img className='user-logo' src={usericon} alt="User Icon" />
    </div>
  );
}
