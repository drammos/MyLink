import React, { useState, useEffect } from 'react';
import { GoXCircle, GoCheckCircle } from "react-icons/go";
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import { agents } from '../../../agents';
import useService from "../../Services/useService";

import './MessageInterface.css';

const MessageInterface = ({ userInfo }) => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [chats, setChats] = useState([]);
    const [error, setError] = useState('');
    const [errorCode, setErrorCode] = useState(2);
    



    const buildUrl = () => {
        console.log("user", userInfo);
        const params = new URLSearchParams();
        const url2 = agents.localhost + agents.getUserConnectedChats;
        params.append('Username', userInfo.userName);
        // params.append('PageNumber', pageNumber.toString());
        // params.append('PageSize', pageSize.toString());
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
        refetch();
    }, [userInfo]);

    
    useEffect(() => {
        if (response) {
            if (response.status === 200) {
                setErrorCode(0);
                setChats(response.data);
            } else {
                console.log(response.data.detail);
                setError(response.data.detail);
                setErrorCode(1);
            }
        }
    }, [response]);
    

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