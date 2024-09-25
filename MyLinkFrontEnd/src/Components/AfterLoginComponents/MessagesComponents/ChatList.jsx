import React from 'react';
import './ChatList.css';

const ChatList = ({ chats, onSelectChat, selectedChatId }) => {
    return (
        <div className="chat-list">
            <div className="chat-list-header">
                <h2 color='#1fb4c2'>Messaging</h2>
            </div>
            <div className="chat-list-items">
                {chats.map(chat => (
                    <div 
                        key={chat.id} 
                        className={`chat-item ${selectedChatId === chat.id ? 'selected' : ''}`}
                        onClick={() => onSelectChat(chat)}
                    >
                        <img src={`https://res.cloudinary.com/dvhi4yyrm/image/upload/v1725693786/bui1pzeaj5msljlp1qvi.png`} alt={chat.name} className="chat-avatar" />
                        <div className="chat-info">
                            <h3>{chat.name}</h3>
                            <p>{chat.lastMessage}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatList;