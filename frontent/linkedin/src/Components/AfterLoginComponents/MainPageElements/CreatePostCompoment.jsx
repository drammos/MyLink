import { FaEdit, FaFileAlt, FaVideo, FaCamera } from "react-icons/fa";
import { InputText } from 'primereact/inputtext';
import { useState, useEffect } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { GoXCircle, GoCheckCircle } from "react-icons/go";


import useCreatePost from '../../Services/useCreatePost';

import './styles/CreatePostComponent.css'

const CreatePostComponent = () => {

    const userId = localStorage.getItem('id');
    const [title, setTitle] = useState('');      
    const [text, setText] = useState('');        
    const [createdAt, setCreatedAt] = useState(''); 
    const [pictureUrls, setPictureUrls] = useState('');
    const [videoUrls, setVideoUrls] = useState('');
    const [voiceUrls, setVoiceUrls] = useState('');
    const [infoMessage, setinfoMessage] = useState('');
    const [postIt, setPostIt] = useState(0);
    const [ErrorCode, setErrorCode] = useState(2);

    const { message, errorCode, loading, createPostRefetch } = useCreatePost();

    const handlePostSubmit = () => {
        const currentDate = new Date().toISOString();
        setCreatedAt(currentDate);
        setPostIt(1);
    };

    useEffect(() => {
        if (postIt) {
            if (title && text ) {
                createPostRefetch(userId, title, text, createdAt, pictureUrls, videoUrls, voiceUrls);
                setText("");
                setTitle("");
                setinfoMessage(message);
            } else {
                setinfoMessage("Please enter both title and content for your post.");
            }
            setPostIt(0);
        }
    }, [postIt, userId, title, text, createdAt, pictureUrls, videoUrls, voiceUrls, createPostRefetch, message]);

    return (
        <div className="new-post-container">
            <div className="new-post">
                <InputText
                    type="text"
                    className="post-title-input"
                    placeholder="Enter post title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <InputTextarea autoResize rows={5} cols={50}
                    className="post-textarea"
                    placeholder="What's on your mind?"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <div className="post-options">
                <button type="button" className="new-post-btn" onClick={handlePostSubmit}>
                    <FaEdit />&nbsp;Post
                </button>
                <div className="media-buttons">
                    <button type="button" className="share-media">
                        <FaFileAlt />
                    </button>
                    <button type="button" className="share-media">
                        <FaVideo />
                    </button>
                    <button type="button" className="share-media">
                        <FaCamera />
                    </button>
                </div>
            </div>
            <div className={
                loading ? 'loading' :
                    (errorCode === 1 ? 'error-message' :
                        (errorCode === 0 ? 'success-message' : ''))
            }>
                {loading ? (<>Loading...</>) :
                    (errorCode === 1 ? (<><GoXCircle /> {infoMessage}</>) :
                        (errorCode === 0 ? (<><GoCheckCircle /> {infoMessage}</>) : ''))}
            </div>
            {loading && <p className="loading">Loading...</p>}
        </div >
    );
};

export default CreatePostComponent;
