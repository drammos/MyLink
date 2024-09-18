import { FaEdit, FaFileAlt, FaVideo, FaCamera } from "react-icons/fa";
import { InputText } from 'primereact/inputtext';
import { useState, useEffect } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { GoXCircle, GoCheckCircle } from "react-icons/go";

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
    const [postIt, setPostIt] = useState(0);
    const [ErrorCode, setErrorCode] = useState(2);

    const { message, errorCode, loading, createPostRefetch } = useCreatePost();

    const handlePostSubmit = () => {
        const currentDate = new Date().toISOString();
        setCreatedAt(currentDate);
        setPostIt(1);
    };

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const uploadResult = await UploadPhoto(file);
                setPictureUrls(uploadResult.transformedUrl);
                setPictureName(file.name); // Set the name of the uploaded photo
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
                setFileName(file.name); // Set the name of the uploaded file
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
                setVideoName(file.name); // Set the name of the uploaded video
            } catch (error) {
                console.error("Error uploading video", error);
            }
        }
    };

    const clearData = () => {
        setText("");
        setTitle("");
        setPictureName('');
        setFileName('');
        setVideoName('');
    };

    useEffect(() => {
        if (postIt) {
            if (title && text) {
                createPostRefetch(userId, title, text, createdAt, pictureUrls, videoUrls, fileUrls);
                setInfoMessage(message);
                clearData();

            } else {
                setInfoMessage("Please enter both title and content for your post.");
            }
            setPostIt(0);
        }
    }, [postIt, userId, title, text, createdAt, pictureUrls, videoUrls, fileUrls, createPostRefetch, message]);

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
                    {/* File Upload - Accept only common document types */}
                    <label htmlFor="file-upload" className="share-media">
                        <FaFileAlt />
                        <input id="file-upload" type="file" accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx" style={{ display: 'none' }} onChange={handleFileUpload} />
                    </label>

                    {/* Video Upload - Accept only video types */}
                    <label htmlFor="video-upload" className="share-media">
                        <FaVideo />
                        <input id="video-upload" type="file" accept="video/*" style={{ display: 'none' }} onChange={handleVideoUpload} />
                    </label>

                    {/* Image Upload - Accept only image types */}
                    <label htmlFor="photo-upload" className="share-media">
                        <FaCamera />
                        <input id="photo-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoUpload} />
                    </label>
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
        </div>
    );
};

export default CreatePostComponent;
 