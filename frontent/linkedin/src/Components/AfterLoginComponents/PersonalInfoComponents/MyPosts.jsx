import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useGetUserPosts from '../../Services/useGetUserPosts';
import { InputSwitch } from 'primereact/inputswitch';
import useDeletePost from '../../Services/Post/useDeletePost';
import useEditPost from '../../Services/Post/useEditPost';
import { FcLikePlaceholder, FcComments, FcCalendar } from "react-icons/fc";
import './styles/MyPosts.css';

const MyPosts = ({ userInfo }) => {
    const { response, message, errorCode, loading, getPostsRefetch } = useGetUserPosts();
    const { message: deletePostMessage, errorCode: deletePostErrorCode, loading: deletePostLoading, deletePostRefetch } = useDeletePost();
    const { message: editPostMessage, errorCode: editPostErrorCode, loading: editPostLoading, editPostRefetch } = useEditPost();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPostsRefetch();
    }, [userInfo]);

    useEffect(() => {
        if (response && response.data) {
            setPosts(response.data);
        }
    }, [response]);

    const handleVisibilityToggle = (postIndex, isPublic) => {
        // Update the local state
        const updatedPosts = posts.map((post, index) =>
            index === postIndex ? { ...post, isPublic } : post
        );
        setPosts(updatedPosts);

        // Refetch and call editPost with updated visibility status
        const postToUpdate = updatedPosts[postIndex];
        console.log("Post to update: ", postToUpdate);
        editPostRefetch(
            postToUpdate.id,        
            postToUpdate.title,     
            postToUpdate.content,   
            new Date().toISOString(),             
            postToUpdate.pictureUrls, 
            postToUpdate.videoUrls,   
            postToUpdate.voiceUrls,   
            postToUpdate.isLikedByCurrentUser, 
            isPublic                
        );
    };

    const handleDeletePost = async (postId) => {
        await deletePostRefetch(postId); 
    };

    useEffect(() => { 
        console.log("Delete Post Error Code: ", deletePostErrorCode);
        if (deletePostErrorCode === 0) {
            console.log("Post deleted successfully!");
            setTimeout(() => { getPostsRefetch(); }, 2000);
        } else if (deletePostErrorCode > 0) {
            console.log("Error deleting post.");
        }
    }, [deletePostMessage]);

    useEffect(() => { 
        console.log("Edit Post Error Code: ", editPostErrorCode);
        if (editPostErrorCode === 0) {
            console.log("Post edited successfully!");
            //setTimeout(() => { getPostsRefetch(); }, 2000);
        } else if (editPostErrorCode > 0) {
            console.log("Error editing post.");
        }
    }, [editPostMessage]);

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
                                {/* Delete button */}
                                <button
                                    className="delete-button"
                                    onClick={() => handleDeletePost(post.id)}
                                    disabled={deletePostLoading} // Disable button while deleting
                                >
                                    {'Delete'}
                                </button>
                            </div>
                            <p>{post.content}</p>
                            {post.videoUrl && (
                                <div className="post-media">
                                    <a href={post.videoUrl} target="_blank" rel="noopener noreferrer">
                                        Watch Video
                                    </a>
                                </div>
                            )}
                            {post.pictureUrls && post.pictureUrls.length > 0 && post.pictureUrls[0] !== null && (
                                <div className="post-media">
                                    {post.pictureUrls.map((url, picIndex) => (
                                        url && (
                                            <div key={picIndex} className="post-image">
                                                <img src={url} alt={`Post media ${picIndex + 1}`} />
                                            </div>
                                        )
                                    ))}
                                </div>
                            )}
                            {post.videoUrls && post.videoUrls.length > 0 && post.videoUrls[0] !== null && (
                                <div className="post-media">
                                    {post.videoUrls.map((url, vidIndex) => (
                                        url && (
                                            <div key={vidIndex} className="post-video">
                                                <a href={url} target="_blank" rel="noopener noreferrer">Watch Video {vidIndex + 1}</a>
                                            </div>
                                        )
                                    ))}
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
