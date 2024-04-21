import React, { useEffect, useState, useMemo } from "react";
import "../Scss/MessagesComponent.scss";
import { useLocation } from "react-router-dom";
import { saveMessage, getAllMessages } from "../API/FirestoreAPI";
import { getCurrentTimeStamp } from "../helpers/useMoment";

export default function MessagesComponent({ currentUser }) {
    const location = useLocation();
    const messengerId = location.state?.messengerId;
    const messengerEmail = location.state?.messengerEmail;

    const [message, setMessage] = useState("");
    const [allMessages, setAllMessages] = useState([]);

    const getMessage = (event) => {
        setMessage(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && message.trim() !== "") {
            uploadMessage();
        }
    };

    const uploadMessage = () => {
        saveMessage(
            currentUser?.userid,
            currentUser?.name,
            messengerId,
            getCurrentTimeStamp("LLL"),
            message
        );

        setMessage("");
    };

    useMemo(() => {
        if (messengerId?.length > 0) {
            getAllMessages(currentUser?.userid, messengerId, setAllMessages);
        }
    }, [currentUser?.userid, messengerId]);

    return (
        <>
            <div className="messages-component-container">
                {allMessages.length > 0 ? (
                    allMessages.map((Message, index) => (
                        <div className="message-preview" key={index}>
                            <div className="message-header">
                                <p className="message-sender">
                                    {Message?.senderName}
                                </p>
                                <p className="message-timestamp">
                                    {Message?.timeStamp}
                                </p>
                            </div>
                            <p className="message-text">{Message?.message}</p>
                        </div>
                    ))
                ) : (
                    <></>
                )}
                {messengerId?.length > 0 && (
                    <div className="message-input-container">
                        <input
                            onChange={getMessage}
                            onKeyDown={handleKeyDown}
                            name="Message"
                            placeholder="Type a message..."
                            className="Message-input"
                            value={message}
                        ></input>
                        <button
                            className="Message-btn"
                            onClick={uploadMessage}
                            type="primary"
                            disabled={message.length > 0 ? false : true}
                        >
                            Send
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
