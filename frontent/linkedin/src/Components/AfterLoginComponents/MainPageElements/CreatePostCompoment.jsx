import { FaEdit, FaFileAlt, FaVideo, FaCamera } from "react-icons/fa";
import { InputText } from 'primereact/inputtext';
import { useState, useEffect } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { GoXCircle, GoCheckCircle } from "react-icons/go";
import { InputSwitch } from 'primereact/inputswitch'; // Import InputSwitch

import useCreatePost from '../../Services/useCreatePost';
import UploadPhoto from '../../Services/UploadPhoto';
import UploadFile from '../../Services/UploadFile';
import UploadVideo from '../../Services/UploadVideo';

import './styles/CreatePostComponent.css';

const CreatePostComponent = () => {
    const userId = localStorage.getItem('id');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [pictureUrls, setPictureUrls] = useState('');
    const [videoUrls, setVideoUrls] = useState('');
    const [fileUrls, setFileUrls] = useState('');
    const [pictureName, setPictureName] = useState('');
    const [videoName, setVideoName] = useState('');
    const [fileName, setFileName] = useState('');
    const [infoMessage, setInfoMessage] = useState('');
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [ErrorCode, setErrorCode] = useState(2);
    const [isPublic, setIsPublic] = useState(true);

    const { message, errorCode, loading, createPostRefetch } = useCreatePost();

    const handlePostSubmit = () => {
        // Validate both title and text
        if (!title || !text) {
            setInfoMessage("Please enter both title and content for your post.");
            setErrorCode(1);
            return;
        }

        const currentDate = new Date().toISOString();
        setCreatedAt(currentDate);
        setIsFormSubmitted(true);
    };

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const uploadResult = await UploadPhoto(file);
                setPictureUrls(uploadResult.transformedUrl);
                setPictureName(file.name); 
            } catch (error) {
                console.error("Error uploading image", error);
            }
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const uploadResult = await UploadFile(file);
                setFileUrls(uploadResult.originalUrl);
                setFileName(file.name); 
            } catch (error) {
                console.error("Error uploading file", error);
            }
        }
    };

    const handleVideoUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const uploadResult = await UploadVideo(file);
                setVideoUrls(uploadResult.originalUrl);
                setVideoName(file.name); 
            } catch (error) {
                console.error("Error uploading video", error);
            }
        }
    };

    const clearData = async () => {
        setText('');
        setTitle('');
        setPictureName('');
        setFileName('');
        setVideoName('');
        setIsFormSubmitted(false);
    };

    useEffect(() => {
        const handlePost = async () => {
            if (isFormSubmitted) {
                await createPostRefetch(userId, title, text, createdAt, pictureUrls, videoUrls, fileUrls, isPublic);
                await clearData();
            } else {
                setInfoMessage("Please enter both title and content for your post.");
                setErrorCode(1);
            }
        };

        if (isFormSubmitted) {
            handlePost();
        }
    }, [isFormSubmitted, userId, title, text, createdAt, pictureUrls, videoUrls, fileUrls, isPublic, createPostRefetch, message]);

    useEffect(() => {
        if (errorCode === 1) {
            setInfoMessage("An error occurred. Please try again.");
            setErrorCode(1);
        } else if (errorCode === 0) {
            setInfoMessage("Post uploaded!");
            setErrorCode(0);
        }
    }, [errorCode]);

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

            <div className="uploaded-files-info">
                {pictureName && <p>Uploaded Image: {pictureName}</p>}
                {fileName && <p>Uploaded File: {fileName}</p>}
                {videoName && <p>Uploaded Video: {videoName}</p>}
            </div>

            <div className="post-options">
                <button type="button" className="new-post-btn" onClick={handlePostSubmit}>
                    <FaEdit />&nbsp;Post
                </button>
                <div className="media-buttons">
                    <label htmlFor="file-upload" className="share-media">
                        <FaFileAlt />
                        <input id="file-upload" type="file" accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx" style={{ display: 'none' }} onChange={handleFileUpload} />
                    </label>
                    <label htmlFor="video-upload" className="share-media">
                        <FaVideo />
                        <input id="video-upload" type="file" accept="video/*" style={{ display: 'none' }} onChange={handleVideoUpload} />
                    </label>
                    <label htmlFor="photo-upload" className="share-media">
                        <FaCamera />
                        <input id="photo-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoUpload} />
                    </label>
                </div>
            </div>

            <div className="public-private-toggle">
                <label>Post Visibility: </label>
                <InputSwitch checked={isPublic} onChange={(e) => setIsPublic(e.value)} />
                <span>{isPublic ? 'Public' : 'Private'}</span>
            </div>

            <div className={loading ? 'loading' : (ErrorCode === 1 ? 'error-message' : (ErrorCode === 0 ? 'success-message' : ''))}>
                {loading ? (<>Loading...</>) : (ErrorCode === 1 ? (<><GoXCircle /> {infoMessage}</>) : (ErrorCode === 0 ? (<><GoCheckCircle /> {infoMessage}</>) : ''))}
            </div>
            {loading && <p className="loading">Loading...</p>}
        </div>
    );
};

export default CreatePostComponent;