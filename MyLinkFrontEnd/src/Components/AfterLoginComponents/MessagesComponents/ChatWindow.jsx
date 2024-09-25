import React, { useState, useEffect } from 'react';
import './ChatWindow.css';

const ChatWindow = ({ selectedChat, userInfo }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        if (selectedChat) {
            // Fetch messages for the selected chat (placeholder)
            setMessages([
                { id: 1, sender: selectedChat.name, content: 'Hello there!', avatar: selectedChat.avatar },
                { id: 2, sender: userInfo.name, content: 'Hi! How are you?', avatar: userInfo.avatar },
            ]);
        }
    }, [selectedChat]);

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
                <h2>{selectedChat.name}</h2>
            </div>
            <div className="message-list">
                {messages.map(message => (
                    <div key={message.id} className={`message ${message.sender === userInfo.name ? 'sent' : 'received'}`}>
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