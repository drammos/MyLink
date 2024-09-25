import React, { useState, useEffect } from 'react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import './MessageInterface.css';

const MessageInterface = ({ userInfo }) => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        // Fetch chats from your API (placeholder)
        setChats([
            { id: 1, name: 'Asimina Lampropoulou', lastMessage: 'Congrats on your 1 year anniversary at Entersoft!', avatar: 'https://via.placeholder.com/40' },
            { id: 2, name: 'Maria Kanaki', lastMessage: 'Έχεις πολύ ωραίο χαμόγελο και δεν γινόταν...', avatar: 'https://via.placeholder.com/40' },
        ]);
    }, [userInfo]);

    return (
        <div className="message-interface">
            <ChatList 
                chats={chats} 
                onSelectChat={setSelectedChat} 
                selectedChatId={selectedChat?.id}
            />
            <ChatWindow 
                selectedChat={selectedChat} 
                userInfo={userInfo}
            />
        </div>
    );
};

export default MessageInterface;