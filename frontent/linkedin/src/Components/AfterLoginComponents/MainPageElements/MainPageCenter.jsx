import React, { useState } from "react";
import { FaEdit, FaFileAlt, FaVideo, FaCamera, FaUserCircle, FaThumbsUp, FaGlobe } from "react-icons/fa";
import './styles/MainPageCenter.css';

const MainPageCenter = () => {
    const [postContent, setPostContent] = useState("");

    const handlePostSubmit = () => {
        // Handle post submission logic here (e.g., send to API)
        console.log("Post Submitted:", postContent);
        setPostContent("");  // Clear the input after submission
    };

    return (
        <div className="main-page-center">
            {/* New Post Section */}
            <div className="new-post-container">
                <div className="new-post">
                    <textarea
                        className="post-textarea"
                        placeholder="What's on your mind?"
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
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
            </div>

            {/* Example Post Display */}
            <div className="show-post-container">
                <div className="show-comment">
                    <b>Your connection&nbsp;</b>commented/reacted on this
                </div>
                <div className="show-account-name">
                    <FaUserCircle size="2rem" color="rgba(0, 0, 0, 0.6)" />
                    <div className="account-details">
                        <b>User Name</b>&nbsp;
                        <span className="small-icon">●</span>&nbsp;1st
                        <br />
                        <p>User bio</p>
                        <p>
                            8h&nbsp;<span className="small-icon">●</span> Edited/None&nbsp;
                            <span className="small-icon">●</span> <FaGlobe />
                        </p>
                    </div>
                </div>
                <div>
                    <p>Lorem Ipsum text describing the post goes here. This is where the content of the post is displayed.</p>
                </div>
                <div className="show-activity">
                    <FaThumbsUp />&nbsp;You and&nbsp;<a href="#"><b>n</b></a>&nbsp;others
                </div>
            </div>
        </div>
    );
};

export default MainPageCenter;
