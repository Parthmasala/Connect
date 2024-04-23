import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import ConnectLogo from "../../../assets/ConnectLogo.png";
import Search from "../Search";
import usericon from "../../../assets/user-icon.png";
import { IoMdHome, IoIosBriefcase, IoMdNotifications } from "react-icons/io";
import { FaUserPlus, FaSearch, FaComments, FaFileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../../API/FirestoreAPI";
import ProfilePopup from "../ProfilePopup";

export default function Navbar({ currentUser }) {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const userLogoRef = useRef(null);
    const menuRef = useRef(null);

    const Route = (path) => {
        navigate(path);
    };

    useEffect(() => {
        getAllUsers(setUsers);
    }, []);

    useEffect(() => {
        let debounded = setTimeout(() => {
            handleSearch();
        }, 1000);
        return () => clearTimeout(debounded);
    }, [searchInput]);

    const handleSearch = () => {
        if (searchInput !== "") {
            let searched = users.filter((user) => {
                return Object.values(user)
                    .join("")
                    .toLowerCase()
                    .includes(searchInput.toLowerCase());
            });
            setFilteredUsers(searched);
        } else {
            setFilteredUsers(users);
        }
    };

    const openUser = (user) => {
        navigate("/profile", {
            state: {
                id: user?.id,
                email: user.email,
            },
        });
        setSearchInput("");
        window.location.reload();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setSearchInput("");
                // setIsSearch(!isSearch);
                setIsSearch(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                userLogoRef.current &&
                !userLogoRef.current.contains(event.target)
            ) {
                setShowPopup(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="navbar-master">
            <img
                className="connect-logo"
                src={ConnectLogo}
                alt="Connect Logo"
                onClick={() => Route("/home")}
            />
            {isSearch ? (
                <Search
                    setIsSearch={setIsSearch}
                    setSearchInput={setSearchInput}
                    searchInput={searchInput}
                />
            ) : (
                <div className="icons">
                    <IoMdHome
                        size={40}
                        className="icon-scss"
                        onClick={() => Route("/Home")}
                    />
                    <FaUserPlus
                        size={30}
                        className="icon-scss"
                        onClick={() => Route("/Connections")}
                    />
                    <IoIosBriefcase
                        size={40}
                        className="icon-scss"
                        onClick={() => Route("/Jobs")}
                    />
                    <FaSearch
                        size={30}
                        className="icon-scss"
                        onClick={() => setIsSearch(true)}
                    />
                    <FaComments
                        size={30}
                        className="icon-scss"
                        onClick={() => Route("/Messages")}
                    />
                    <IoMdNotifications
                        size={40}
                        className="icon-scss"
                        onClick={() => Route("/Notifications")}
                    />
                    <FaFileAlt
                        size={30}
                        className="icon-scss"
                        onClick={() => Route("/resumeBuilder")}
                    />
                </div>
            )}
            <div ref={userLogoRef} onClick={() => setShowPopup(!showPopup)}>
                <img
                    className="user-logo"
                    src={currentUser?.imageLink || usericon}
                    alt="User Icon"
                />
                {showPopup && <ProfilePopup currentUser={currentUser} />}
            </div>

            {searchInput.length === 0 ? (
                <></>
            ) : (
                <div ref={menuRef} className="search-results">
                    {filteredUsers.length === 0 ? (
                        <div className="search-inner">No results</div>
                    ) : (
                        filteredUsers.map((user) => (
                            <div
                                className="search-inner"
                                onClick={() => openUser(user)}
                            >
                                <img
                                    src={usericon || user?.imageLink}
                                    alt={user.name}
                                />
                                <p className="name">{user?.name}</p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
