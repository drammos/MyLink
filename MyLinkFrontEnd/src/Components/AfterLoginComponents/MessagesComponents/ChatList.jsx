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
                        key={chat.interlocutorUserId} 
                        className={`chat-item ${selectedChatId === chat.interlocutorUserId ? 'selected' : ''}`}
                        onClick={() => onSelectChat(chat)}
                    >
                        <img src={chat.interlocutorPictureURL} alt={chat.interlocutorFirstname + " " + chat.interlocutorLastname} className="chat-avatar" />
                        <div className="chat-info">
                            <h3>{chat.interlocutorFirstname + " " + chat.interlocutorLastname}</h3>
                            <p>{chat.lastMessage}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatList;