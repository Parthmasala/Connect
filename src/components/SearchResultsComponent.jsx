import React, { useEffect, useState } from "react";
import "../Scss/SearchResultsComponent.scss";
import { getAllUsers } from "../API/FirestoreAPI";
import SearchedUsers from "./common/SearchedUsers";
import { useLocation } from "react-router-dom";

export default function SearchResultsComponent({ currentUser }) {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const location = useLocation();
    const searchInput = location.state?.searchInput;

    useEffect(() => {
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

        handleSearch();
    }, [searchInput, users]);

    useEffect(() => {
        getAllUsers(setUsers);
    }, []);

    return searchInput.length === 0 ? (
        <></>
    ) : (
        <div className='searched-results'>
            {filteredUsers.length === 0 ? (
                <div className='search-inner'>No results</div>
            ) : (
                filteredUsers.map((user) => {
                    return (
                        user.id !== currentUser.userid && (
                            <SearchedUsers user={user} />
                        )
                    );
                })
            )}
        </div>
    );
}
