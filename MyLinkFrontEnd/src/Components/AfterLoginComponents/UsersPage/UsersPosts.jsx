import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useGetUserPosts from '../../Services/useGetUserPosts';
import useCreateComment from '../../Services/Post/useCreateComment';
import useCreateReaction from '../../Services/Post/useCreateReaction';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { FcLike, FcLikePlaceholder, FcComments , FcCalendar } from "react-icons/fc";
import './styles/UserPosts.css';

const UserPosts = ({ userInfo }) => {
    const { response, message, errorCode, loading, getPostsRefetch } = useGetUserPosts();
    const { reactId, message: CreateReactMessage, errorCode: CreateReactErrorCode, loading: CreateReactLoading, createReactionRefetch } = useCreateReaction();
    const { message: CreateCommentMessage, errorCode: CreateCommentErrorCode, loading: CreateCommentLoading, createCommentRefetch } = useCreateComment();

    const [posts, setPosts] = useState([]);
    const [commentInputs, setCommentInputs] = useState({});

    useEffect(() => {
        getPostsRefetch(userInfo.id);
    }, [userInfo.id]);

    useEffect(() => {
        if (response) {
            console.log("API Response:", response); // For debugging
            if (Array.isArray(response)) {
                setPosts(response);
            } else if (typeof response === 'object' && response.data) {
                if (Array.isArray(response.data)) {
                    setPosts(response.data);
                } else {
                    console.error("Unexpected response structure:", response);
                    setPosts([]);
                }
            } else {
                console.error("Unexpected response structure:", response);
                setPosts([]);
            }
        }
    }, [response, errorCode]);

    if (loading) return <p>Loading posts...</p>;
    if (errorCode !== 0) return <p>Error loading posts: {message}</p>;

    // Filter out private posts
    const publicPosts = posts.filter(post => post.isPublic);

    // Handle reactions
    const handleLike = async (postId) => {
        try {
            await createReactionRefetch("Like", postId, userInfo.userName);
            setPosts(posts.map(post =>
                post.id === postId
                    ? {
                        ...post,
                        reactionsCount: post.reactionsCount + 1,
                        isLikedByCurrentUser: true
                    }
                    : post
            ));
            getPostsRefetch(userInfo.id);
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    const handleCommentSubmit = async (postId) => {
        const commentText = commentInputs[postId] || '';
        if (commentText.trim() === '') return;

        try {
            const currentDate = new Date().toISOString();
            await createCommentRefetch(commentText, postId, userInfo.userName, currentDate); 
            setPosts(posts.map(post =>
                post.id === postId
                    ? { ...post, commentsCount: post.commentsCount + 1 }
                    : post
            ));
            setCommentInputs(prevState => ({
                ...prevState,
                [postId]: ''
            }));
            getPostsRefetch(userInfo.id);
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    const handleCommentInputChange = (postId, value) => {
        setCommentInputs(prevState => ({
            ...prevState,
            [postId]: value
        }));
    };

    return (
        <div className="posts-container">
            <h3>User Posts</h3>
            {publicPosts.length > 0 ? (
                <ul className="posts-list">
                    {publicPosts.map((post, index) => (
                        <li key={index} className="post-item">
                            <div className="post-header">
                                <h4>{post.title}</h4>
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
                                <div className="post-action">
                                    <FcComments /> {post.commentsCount} Comment
                                </div>
                                <button
                                    className="post-action"
                                    onClick={() => !post.isLikedByCurrentUser && handleLike(post.id)}
                                    disabled={post.isLikedByCurrentUser}
                                >
                                    {post.isLikedByCurrentUser ? <FcLike /> : <FcLikePlaceholder />}
                                    {post.reactionsCount}
                                    {post.isLikedByCurrentUser ? 'Liked' : 'Like'}
                                </button>
                                <span><FcCalendar /> Created on: {new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>

                            <div className="comment-input">
                                <InputText
                                    value={commentInputs[post.id] || ''}
                                    onChange={(e) => handleCommentInputChange(post.id, e.target.value)}
                                    placeholder="Write a comment..."
                                    className="p-inputtext-sm" 
                                />
                                <Button
                                    label="Submit"
                                    icon="pi pi-check"
                                    onClick={() => handleCommentSubmit(post.id)}
                                    className="p-button-sm" // PrimeReact class for a smaller button
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="post-item">No public posts available</p>
            )}
        </div>
    );
};

UserPosts.propTypes = {
    userInfo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
    }).isRequired,
};

export default UserPosts;



// !!!!!!!!!!!!!!! Code for fixed likes

//import React, { useEffect, useState } from 'react';
//import PropTypes from 'prop-types';
//import useGetUserPosts from '../../Services/useGetUserPosts';
//import useCreateComment from '../../Services/Post/useCreateComment';
//import useCreateReaction from '../../Services/Post/useCreateReaction';
//import useDeleteReaction from '../../Services/Post/useDeleteReaction';
//import { FcLike, FcLikePlaceholder, FcComments, FcCalendar } from "react-icons/fc";
//import './styles/UserPosts.css';

//const UserPosts = ({ userInfo }) => {
//    const { response, message, errorCode, loading, getPostsRefetch } = useGetUserPosts();
//    const { reactId, message: CreateReactMessage, errorCode: CreateReactErrorCode, loading: CreateReactLoading, createReactionRefetch } = useCreateReaction();
//    const { message: CreateCommentMessage, errorCode: CreateCommentErrorCode, loading: CreateCommentLoading, createCommentRefetch } = useCreateComment();
//    const { message: DeleteReactMessage, errorCode: DeleteReactErrorCode, loading: DeleteReactLoading, deleteReactionRefetch } = useDeleteReaction();

//    const [posts, setPosts] = useState([]);
//    const [userComments, setUserComments] = useState({});
//    const [commentInputs, setCommentInputs] = useState({});

//    useEffect(() => {
//        getPostsRefetch(userInfo.id);
//    }, [userInfo.id]);

//    useEffect(() => {
//        if (response) {
//            console.log("API Response:", response); // For debugging
//            if (Array.isArray(response)) {
//                setPosts(response.map(post => ({
//                    ...post,
//                    reactionId: post.isLikedByCurrentUser ? post.userReaction?.id : null
//                })));
//            } else if (typeof response === 'object' && response.data) {
//                if (Array.isArray(response.data)) {
//                    setPosts(response.data.map(post => ({
//                        ...post,
//                        reactionId: post.isLikedByCurrentUser ? post.userReaction?.id : null
//                    })));
//                } else {
//                    console.error("Unexpected response structure:", response);
//                    setPosts([]);
//                }
//            } else {
//                console.error("Unexpected response structure:", response);
//                setPosts([]);
//            }
//        }
//    }, [response, errorCode]);

//    if (loading) return <p>Loading posts...</p>;
//    if (errorCode !== 0) return <p>Error loading posts: {message}</p>;

//    // Filter out private posts
//    const publicPosts = posts.filter(post => post.isPublic);

//    // Handle reactions
//    const toggleReaction = async (postId, isCurrentlyLiked, reactionId) => {
//        try {
//            if (isCurrentlyLiked) {
//                if (reactionId) {
//                    await deleteReactionRefetch(reactionId);
//                } else {
//                    console.error("Trying to delete a reaction without a reactionId");
//                    return;
//                }
//            } else {
//                const result = await createReactionRefetch("Like", postId, userInfo.userName);
//                if (result && result.id) {
//                    reactionId = result.id;
//                }
//            }

//            setPosts(posts.map(post =>
//                post.id === postId
//                    ? {
//                        ...post,
//                        reactionsCount: post.reactionsCount + (isCurrentlyLiked ? -1 : 1),
//                        isLikedByCurrentUser: !isCurrentlyLiked,
//                        reactionId: isCurrentlyLiked ? null : reactionId
//                    }
//                    : post
//            ));
//            getPostsRefetch(userInfo.id);
//        } catch (error) {
//            console.error("Error toggling reaction:", error);
//        }
//    };

//    const handleCommentSubmit = async (postId) => {
//        const commentText = commentInputs[postId] || '';
//        if (commentText.trim() === '') return;

//        try {
//            await createCommentRefetch(postId, commentText);
//            setUserComments(prevState => ({
//                ...prevState,
//                [postId]: [...(prevState[postId] || []), commentText]
//            }));
//            setCommentInputs(prevState => ({
//                ...prevState,
//                [postId]: ''
//            }));
//            getPostsRefetch(userInfo.id);
//        } catch (error) {
//            console.error("Error submitting comment:", error);
//        }
//    };

//    const handleCommentInputChange = (postId, value) => {
//        setCommentInputs(prevState => ({
//            ...prevState,
//            [postId]: value
//        }));
//    };

//    return (
//        <div className="posts-container">
//            <h3>User Posts</h3>
//            {publicPosts.length > 0 ? (
//                <ul className="posts-list">
//                    {publicPosts.map((post, index) => (
//                        <li key={index} className="post-item">
//                            <div className="post-header">
//                                <h4>{post.title}</h4>
//                            </div>
//                            <p>{post.content}</p>
//                            {/* ... (other post content remains the same) ... */}
//                            <div className="post-info">
//                                <div className="post-action">
//                                    <FcComments /> {post.commentsCount} Comment
//                                </div>
//                                <button
//                                    className="post-action"
//                                    onClick={() => toggleReaction(post.id, post.isLikedByCurrentUser, post.reactionId)}
//                                >
//                                    {post.isLikedByCurrentUser ? <FcLike /> : <FcLikePlaceholder />}
//                                    {post.reactionsCount}
//                                    {post.isLikedByCurrentUser ? 'Unlike' : 'Like'}
//                                </button>
//                                <span><FcCalendar /> Created on: {new Date(post.createdAt).toLocaleDateString()}</span>
//                            </div>

//                            <div className="comment-input">
//                                <input
//                                    type="text"
//                                    value={commentInputs[post.id] || ''}
//                                    onChange={(e) => handleCommentInputChange(post.id, e.target.value)}
//                                    placeholder="Write a comment..."
//                                />
//                                <button onClick={() => handleCommentSubmit(post.id)}>Submit</button>
//                            </div>
//                        </li>
//                    ))}
//                </ul>
//            ) : (
//                <p className="post-item">No public posts available</p>
//            )}
//        </div>
//    );
//};

//UserPosts.propTypes = {
//    userInfo: PropTypes.shape({
//        id: PropTypes.string.isRequired,
//        userName: PropTypes.string.isRequired,
//    }).isRequired,
//};

//export default UserPosts;


