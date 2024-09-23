import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useGetUserPosts from '../../Services/useGetUserPosts';
import { InputSwitch } from 'primereact/inputswitch';
import { FcLikePlaceholder, FcComments, FcCalendar } from "react-icons/fc";
import './styles/MyPosts.css';

const MyPosts = ({ userInfo }) => {
    const { response, message, errorCode, loading, getPostsRefetch } = useGetUserPosts();

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPostsRefetch();
    }, [userInfo]);

    useEffect(() => {
        if (response && response.data) {
            setPosts(response.data);
        }
    }, [response, errorCode]);

    const handleVisibilityToggle = (postIndex, isPublic) => {
        setPosts((prevPosts) =>
            prevPosts.map((post, index) =>
                index === postIndex ? { ...post, isPublic } : post
            )
        );
        // Optionally, you can also send an API request to update the visibility in the backend here.
    };

    if (loading) return <p>Loading posts...</p>;
    if (errorCode !== 0) return <p>Error loading posts: {message}</p>;

    return (
        <div className="myposts-container">
            <h3>User Posts</h3>
            {posts.length > 0 ? (
                <ul className="posts-list">
                    {posts.map((post, index) => (
                        <li key={index} className="post-item">
                            <div className="post-header">
                                <h4>{post.title}</h4>
                                <div className="visibility-toggle">
                                    <span>{post.isPublic ? 'Public' : 'Private'}</span>
                                    <InputSwitch
                                        checked={post.isPublic}
                                        onChange={(e) => handleVisibilityToggle(index, e.value)}
                                    />
                                </div>
                            </div>
                            <p>{post.content}</p>
                            {post.videoUrl && (
                                <div className="post-media">
                                    <a href={post.videoUrl} target="_blank" rel="noopener noreferrer">
                                        Watch Video
                                    </a>
                                </div>
                            )}
                            {post.voiceUrl && (
                                <div className="post-media">
                                    <a href={post.voiceUrl} target="_blank" rel="noopener noreferrer">
                                        Listen Audio
                                    </a>
                                </div>
                            )}
                            <div className="post-info">
                                <span><FcComments /> {post.commentsCount} comments</span>
                                <span><FcLikePlaceholder /> {post.reactionsCount} reactions</span>
                                <span><FcCalendar /> Created on: {new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No posts available</p>
            )}
        </div>
    );
};

MyPosts.propTypes = {
    userInfo: PropTypes.shape({
        posts: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            content: PropTypes.string,
            startDate: PropTypes.string,
            endDate: PropTypes.string,
            commentCount: PropTypes.number,
            createdAt: PropTypes.string,
            isPublic: PropTypes.bool,
            videoUrl: PropTypes.string,
            voiceUrl: PropTypes.string,
            reactionCount: PropTypes.number,
        }))
    }).isRequired,
};

export default MyPosts;
