import { useState, useEffect } from "react";
//import { FaThumbsUp, FaRegCommentAlt, FaUserCircle, FaGlobe } from "react-icons/fa";
import useGetUserPosts from '../../Services/useGetUserPosts';
import useCreateComment from '../../Services/Post/useCreateComment';
import useCreateReaction from '../../Services/Post/useCreateReaction';
import './styles/MainPageCenter.css'; 
import CreatePostComponent from "./CreatePostCompoment";

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { FcLike, FcLikePlaceholder, FcComments, FcCalendar } from "react-icons/fc";


const MainPageCenter = () => {
    const { response, message, errorCode, loading, getPostsRefetch } = useGetUserPosts();
    const { reactId, message: CreateReactMessage, errorCode: CreateReactErrorCode, loading: CreateReactLoading, createReactionRefetch } = useCreateReaction();
    const { message: CreateCommentMessage, errorCode: CreateCommentErrorCode, loading: CreateCommentLoading, createCommentRefetch } = useCreateComment();
    const [posts, setPosts] = useState([]);
    const [postsNumber, setPostsNumber] = useState(0);

    const [commentInputs, setCommentInputs] = useState({});

    useEffect(() => {
        getPostsRefetch();
    }, []);

    useEffect(() => {
        if (response) {
            setPosts(response.data);
        }
    }, [response]);

    useEffect(() => {
        setPostsNumber(posts.length);
    }, [posts]);

    //const formatDate = (dateString) => {
    //    const date = new Date(dateString);
    //    return date.toLocaleString();
    //};

    useEffect(() => {
        getPostsRefetch(localStorage.getItem('id'));
    }, []);

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
            await createReactionRefetch("Like", postId, localStorage.getItem('username'));
            setPosts(posts.map(post =>
                post.id === postId
                    ? {
                        ...post,
                        reactionsCount: post.reactionsCount + 1,
                        isLikedByCurrentUser: true
                    }
                    : post
            ));
            getPostsRefetch(localStorage.getItem('id'));
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    const handleCommentSubmit = async (postId) => {
        const commentText = commentInputs[postId] || '';
        if (commentText.trim() === '') return;

        try {
            const currentDate = new Date().toISOString();
            await createCommentRefetch(commentText, postId, localStorage.getItem('username'), currentDate);
            setPosts(posts.map(post =>
                post.id === postId
                    ? { ...post, commentsCount: post.commentsCount + 1 }
                    : post
            ));
            setCommentInputs(prevState => ({
                ...prevState,
                [postId]: ''
            }));
            getPostsRefetch(localStorage.getItem('id'));
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
            <CreatePostComponent />
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
        //<div className="posts-container">
        //    {loading && <p>Loading posts...</p>}
        //    {
        //        postsNumber > 0 ? (
        //            posts.map((post) => (
        //                <div key={post.id} className="post-item">
        //                    {/* User Info */}
        //                    {/*<div className="post-header">*/}
        //                    {/*    <FaUserCircle size="2rem" color="rgba(0, 0, 0, 0.6)" />*/}
        //                    {/*    <div className="account-details">*/}
        //                    {/*        <b>{post.user.firstName} {post.user.lastName}</b>*/}
        //                    {/*        <p>*/}
        //                    {/*            {formatDate(post.createdAt)}{' '}*/}
        //                    {/*            {post.updatedAt !== post.createdAt && ' (Edited)'}{' '}*/}
        //                    {/*            <FaGlobe />*/}
        //                    {/*        </p>*/}
        //                    {/*    </div>*/}
        //                    {/*</div>*/}

        //                    {/* Post Content */}
        //                    <div className="post-content">
        //                        <h3>{post.title}</h3>
        //                        <p>{post.content}</p>

        //                        {post.pictureUrls && post.pictureUrls.length > 0 && (
        //                            <div className="post-media">
        //                                {post.pictureUrls.map((url, index) => (
        //                                    <img key={index} src={url} alt={`Post image ${index + 1}`} />
        //                                ))}
        //                            </div>
        //                        )}

        //                        {post.videoUrls && post.videoUrls.length > 0 && (
        //                            <div className="post-media">
        //                                {post.videoUrls.map((url, index) => (
        //                                    <video key={index} controls>
        //                                        <source src={url} type="video/mp4" />
        //                                        Your browser does not support the video tag.
        //                                    </video>
        //                                ))}
        //                            </div>
        //                        )}
        //                    </div>

        //                    {/* Post Activity */}
        //                    <div className="post-info">
        //                        <div className="post-action">
        //                            <FaThumbsUp /> {post.reactionsCount} {post.reactionsCount === 1 ? 'reaction' : 'reactions'}
        //                        </div>
        //                        <div className="post-action">
        //                            <FaRegCommentAlt /> {post.commentsCount} {post.commentsCount === 1 ? 'comment' : 'comments'}
        //                        </div>
        //                    </div>

        //                    {/* Post Actions (Like, Comment buttons) */}
        //                    <div className="post-actions">
        //                        <button className={`like-button ${post.isLikedByCurrentUser ? 'liked' : ''}`}>
        //                            <FaThumbsUp /> {post.isLikedByCurrentUser ? 'Liked' : 'Like'}
        //                        </button>
        //                        <button className="comment-button">
        //                            <FaRegCommentAlt /> Comment
        //                        </button>
        //                    </div>

        //                    {/* Comments Section */}
        //                    {post.comments && post.comments.length > 0 && (
        //                        <div className="comments-section">
        //                            <h4>Comments</h4>
        //                            {post.comments.map((comment) => (
        //                                <div key={comment.id} className="comment">
        //                                    <p><strong>{comment.username}</strong>: {comment.content}</p>
        //                                    <small>{formatDate(comment.createdAt)}</small>
        //                                </div>
        //                            ))}
        //                        </div>
        //                    )}

        //                    <div className="comment-input">
        //                        <InputText
        //                            value={commentInputs[post.id] || ''}
        //                            onChange={(e) => handleCommentInputChange(post.id, e.target.value)}
        //                            placeholder="Write a comment..."
        //                            className="p-inputtext-sm"
        //                        />
        //                        <Button
        //                            label="Submit"
        //                            icon="pi pi-check"
        //                            onClick={() => handleCommentSubmit(post.id)}
        //                            className="p-button-sm" // PrimeReact class for a smaller button
        //                        />
        //                    </div>
        //                </div>
        //            ))
        //        ) : (
        //            <p>No posts available</p>
        //        )
        //    }
        //</div>
    );
};

export default MainPageCenter;
