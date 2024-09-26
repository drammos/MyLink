import React, { useState, useEffect } from 'react';
import { agents } from '../../../agents';
import useService from "../../Services/useService";
import './ChatWindow.css';

const ChatWindow = ({ selectedChat, userInfo }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [error, setError] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    const [metadata, setMetadata] = useState({
        currentPage: 1,
        totalPages: 1,
        pageSize: 6,
        totalCount: 0,
    });
    
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(8);

    const buildUrl = () => {
        console.log("user", userInfo);
        const params = new URLSearchParams();
        const url2 = agents.localhost + agents.getDiscussionWithoutPagination;
        params.append('MyUsename', userInfo.userName);
        if(selectedChat) params.append("InterlocutorUsername", selectedChat.interlocutorUsername);
        return `${url2}?${params}`;
    };

    const { response, loading, refetch } = useService(
        'Updating user...',
        'GET',
        buildUrl(),
        null,
        undefined,
        true
    );


    useEffect(() => {
        if (selectedChat) {
            console.log("mitsoooooo ", selectedChat);
            console.log("user info is ", userInfo);
            refetch();
        }
    }, [selectedChat]);


    useEffect(() => {
        if (response) {
            if (response.status === 200) {
                setErrorCode(0);
                const discussion = [];
                console.log("consolerrrrrrrr ", response.data);
                response.data.forEach(element => {
                    
                    discussion.push({
                        id: discussion.length + 1,
                        content: element.messageBody,
                        sender: element.ownerUsername,
                        avatar: element.ownerPictureURL
                    });
                });
                setMessages(discussion);
            } else {
                console.log(response.data.detail);
                setError(response.data.detail);
                setErrorCode(1);
            }
        }
    }, [response]);


    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            setMessages([...messages, { id: Date.now(), sender: userInfo.name, content: newMessage, avatar: userInfo.avatar }]);
            setNewMessage('');
        }
    };

    if (!selectedChat) {
        return <div className="chat-window empty-state">Select a chat to start messaging</div>;
    }

    return (
        <div className="chat-window">
            <div className="chat-header">
                <h2>{selectedChat.interlocutorFirstname + " " + selectedChat.interlocutorLastname}</h2>
                <h3>{selectedChat.interlocutorUsername}</h3>
            </div>
            <div className="message-list">
                {messages.map(message => (
                    <div key={message.id} className={`message ${message.sender === userInfo.userName ? 'sent' : 'received'}`}>
                        <img src={message.avatar} alt={message.sender} className="message-avatar" />
                        <div className="message-content">
                            <p>{message.content}</p>
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage} className="message-input">
                <input 
                    type="text" 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)} 
                    placeholder="Write a message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default ChatWindow;