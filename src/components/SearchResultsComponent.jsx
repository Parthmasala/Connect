import React, { useEffect, useState } from "react";
import "../Scss/SearchResultsComponent.scss";
import {
    getAllUsers,
    addConnection,
    removeConnection,
} from "../API/FirestoreAPI";
import SearchedUsers from "./common/SearchedUsers";
import { useLocation } from "react-router-dom";

export default function SearchResultsComponent({ currentUser }) {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
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

    const getCurrentUser = (id) => {
        addConnection(currentUser?.userid, id);
    };

    const removeCurrentUser = (id) => {
        removeConnection(currentUser?.userid, id);
    };

    useEffect(() => {
        getAllUsers(setUsers);
    }, []);

    // Logic for pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return searchInput.length === 0 ? (
        <></>
    ) : (
        <div className="searched-results">
            {currentUsers.length === 0 ? (
                <div className="search-inner">No results</div>
            ) : (
                currentUsers.map((user) => (
                    <SearchedUsers
                        user={user}
                        key={user.id}
                        getCurrentUser={getCurrentUser}
                        currentUser={currentUser}
                        removeCurrentUser={removeCurrentUser}
                    />
                ))
            )}

            {/* Pagination */}
            <nav>
                <ul className="pagination">
                    {Array.from(
                        {
                            length: Math.ceil(
                                filteredUsers.length / usersPerPage
                            ),
                        },
                        (_, i) => (
                            <li key={i} className="page-item">
                                <button
                                    onClick={() => paginate(i + 1)}
                                    className={`page-link ${
                                        currentPage === i + 1 ? "active" : ""
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            </li>
                        )
                    )}
                </ul>
            </nav>
        </div>
    );
}
