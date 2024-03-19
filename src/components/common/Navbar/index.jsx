import React from 'react';
import "./index.scss";
import ConnectLogo from '../../../assets/ConnectLogo.png';
import usericon from '../../../assets/user-icon.png';
import { IoMdHome ,IoIosBriefcase , IoMdNotifications } from "react-icons/io";
import { FaUserPlus, FaSearch, FaComments } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className='navbar-master'>
      <img className='connect-logo' src={ConnectLogo} alt="Connect Logo" />
      <div className='icons'>
        <IoMdHome size={40} className='icon-scss'/>
        <FaUserPlus size={30} className='icon-scss'/>
        <IoIosBriefcase size={40} className='icon-scss'/>
        <FaSearch size={30} className='icon-scss'/>
        <FaComments size={30} className='icon-scss'/>
        <IoMdNotifications size={40} className='icon-scss'/>
      </div>
      <img className='user-logo' src={usericon} alt="User Icon" />
    </div>
  );
}
