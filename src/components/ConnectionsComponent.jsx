import React, { useEffect, useState } from "react";
import "../Scss/ConnectionsComponent.scss";
import {
  getAllUsers,
  addConnection,
  getConnections,
} from "../API/FirestoreAPI";
import ConnectedUsers from "./common/ConnectedUsers";

export default function ConnectionsComponent({ currentUser }) {
  const [users, setUsers] = useState([]);

  const getCurrentUser = (id) => {
    addConnection(currentUser?.userid, id);
  };

  useEffect(() => {
    getAllUsers(setUsers);
  }, []);

  return (
    <div className='connections-container'>
      {users.map((user) => {
        return (
          user.id !== currentUser?.userid && (
            <ConnectedUsers
              user={user}
              key={user.id}
              getCurrentUser={getCurrentUser}
              currentUser={currentUser}
            />
          )
        );
      })}
    </div>
  );
}
