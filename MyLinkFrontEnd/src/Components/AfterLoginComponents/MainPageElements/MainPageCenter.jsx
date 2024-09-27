import { useState, useEffect } from "react";
//import { FaThumbsUp, FaRegCommentAlt, FaUserCircle, FaGlobe } from "react-icons/fa";
import useGetUserPosts from '../../Services/useGetUserPosts';
import useCreateComment from '../../Services/Post/useCreateComment';
import useCreateReaction from '../../Services/Post/useCreateReaction';
import useGetPostComments from '../../Services/Post/useGetPostComments';
import { agents } from '../../../agents';
import useGetPostsFromOtherUsers from '../../Services/Post/useGetPostsFromOtherUsers';
import useService from '../../Services/useService';
import './styles/MainPageCenter.css'; 
import CreatePostComponent from "./CreatePostCompoment";

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { FcLike, FcLikePlaceholder, FcComments, FcCalendar } from "react-icons/fc";


const MainPageCenter = () => {
    const { response: postsResponse, message: postsMessage, errorCode: postsErrorCode, loading: postsLoading, getPostsRefetch } = useGetPostsFromOtherUsers();
    const { createReactionRefetch } = useCreateReaction();
    const { message: createCommentMessage, errorCode: createCommenterrorCode, createCommentRefetch } = useCreateComment();
    const { commentsData, message: getPostCommentsMessage, getPostCommentsRefetch } = useGetPostComments();

    const [posts, setPosts] = useState([]);
    const [refetchWithTimeout, setRefetchWithTimeout] = useState([]);
    const [commentInputs, setCommentInputs] = useState({});
    const [visibleComments, setVisibleComments] = useState({});
    const [comments, setComments] = useState({}); // Comments per post
    const [fetchedComments, setFetchedComments] = useState({});
    const [createMessage, setCreateMessage] = useState('');
    const [createMessageValue, setCreateMessageValue] = useState(2);
    const [postId, setPostId] = useState('');
    const [commentMessages, setCommentMessages] = useState({});
    const [data, setData] = useState(null);

    //#region Get Posts
    useEffect(() => {
        getPostsRefetch(localStorage.getItem('id'));
    }, [localStorage.getItem('id')]);

    useEffect(() => {
        if (createCommenterrorCode === 0) {
            setCreateMessage(createCommentMessage);
            setCreateMessageValue(0);
        }
        else {
            setCreateMessageValue(1);
            setCreateMessage(createCommentMessage);
        }
        setRefetchWithTimeout(0);
    }, [createCommentMessage]);


    useEffect(() => {
        if (postsResponse) {
            let postsData = [];

            if (Array.isArray(postsResponse)) {
                postsData = postsResponse;
            } else if (typeof postsResponse === 'object' && Array.isArray(postsResponse.data)) {
                postsData = postsResponse.data;
            } else {
                console.error("Unexpected posts response structure:", postsResponse);
            }

            setPosts(postsData);
        }
    }, [postsResponse]);
    //#endregion

    // Function to handle fetching comments for each post
    const fetchPostComments = async (PostId) => {
        try {
            await getPostCommentsRefetch(PostId);
            console.log("First step:", commentsData);
            console.log("First step:", getPostCommentsMessage);
            setPostId(PostId);
            //setFetchedComments(commentsData);

        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    useEffect(() => {
        console.log("Second step:", commentsData, postId);
        if (commentsData) {
            setComments(prevState => ({
                ...prevState,
                [postId]: commentsData || []
            }));
        }
    }, [commentsData]);




    // Function to toggle comment visibility and fetch if needed
    const toggleCommentsVisibility = (PostId) => {
        setVisibleComments(prevState => ({
            ...prevState,
            [PostId]: !prevState[PostId]
        }));

        // Fetch comments for this post if not already fetched
        if (!comments[PostId]) {
            fetchPostComments(PostId);
        }
    };

    //#region Likes
    const handleLike = async (PostId) => {
        try {
            await createReactionRefetch("Like", PostId, localStorage.getItem('username'));
            setPosts(prevPosts => prevPosts.map(post =>
                post.id === PostId
                    ? {
                        ...post,
                        reactionsCount: post.reactionsCount + 1,
                        isLikedByCurrentUser: true
                    }
                    : post
            ));
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };
    //#endregion

    // Comments section
    const handleCommentSubmit = async (PostId) => {
        const commentText = commentInputs[PostId] || '';
        if (commentText.trim() === '') return;

        try {
            // Increment the comments count locally
            setPosts(prevPosts => prevPosts.map(post =>
                post.id === PostId
                    ? { ...post, commentsCount: post.commentsCount + 1 }
                    : post
            ));

            const currentDate = new Date().toISOString();
            await createCommentRefetch(commentText, PostId, localStorage.getItem('username'), currentDate);

            // Clear the input after comment submission
            setCommentInputs(prevState => ({
                ...prevState,
                [PostId]: ''
            }));

            setCommentMessages(prevState => ({
                ...prevState,
                [PostId]: { type: 'success', text: 'Comment created!' }
            }));

            setTimeout(() => {
                setCommentMessages(prevState => ({
                    ...prevState,
                    [PostId]: null
                }));
            }, 3000);

            // Fetch updated comments for the post
            await fetchPostComments(PostId);
        } catch (error) {
            console.error("Error submitting comment:", error);

            setCommentMessages(prevState => ({
                ...prevState,
                [PostId]: { type: 'error', text: 'Failed to create comment.' }
            }));

            // Roll back comment count on error
            setPosts(prevPosts => prevPosts.map(post =>
                post.id === PostId
                    ? { ...post, commentsCount: post.commentsCount - 1 }
                    : post
            ));
        }
    };

    const handleCommentInputChange = (PostId, value) => {
        setCommentInputs(prevState => ({
            ...prevState,
            [PostId]: value
        }));
    };

    const urlForPost = agents.localhost + agents.addViewedPost;

    const myPostedService = useService(
        'Add Experience ...',
        'POST',
        urlForPost,
        data,
        'multipart/form-data'
    );
    
    useEffect(() => {
        if (data != null) {
            myPostedService.refetch(); 
        }
    }, [data]);
    
    useEffect(() => {
        if (myPostedService.response) {
          if (myPostedService.response.status === 200) {
            setData(null);
          } else {
            console.log(alltogether.response.data.detail);
            setError(alltogether.response.data.detail);
            setData(null);
          }
        }
    }, [myPostedService.response, data]);

    const handlePostClick = (postId) => {
        const userId = localStorage.getItem('id');    
        console.log("CLICKKK: post id ", postId, userId);
        const informdata = new FormData();
            

        informdata.append("UserId", userId);
        informdata.append("PostId", postId);

        setData(informdata);
    };

    if (postsLoading) return <p>Loading posts...</p>;
    if (postsErrorCode !== 0) return <p>Error loading posts: {postsMessage}</p>;

    const publicPosts = posts.filter(post => post.isPublic);

    return (
        <>
            <CreatePostComponent />
        <div className="main-posts-container">

            {publicPosts.length > 0 ? (
                <ul className="posts-list">
                    {posts.map((post) => (
                        <li key={post.id} className="post-item" 
                        onClick={() => handlePostClick(post.id)}>
                            <div className="post-header">
                                <img
                                    src={post.pictureURL || 'default-avatar.png'}
                                    alt={`${post.firstName} ${post.lastName}`}
                                    className="user-avatar"
                                />
                                <div className="user-info">
                                    <h4>{post.firstName} {post.lastName}</h4>
                                    <span>@{post.userName}</span>
                                </div>
                            </div>
                            <h4>{post.title}</h4>
                            <p>{post.content}</p>
                            <div className="post-info">
                                <div className="post-action">
                                    <FcComments /> {post.commentsCount} Comment(s)
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
                                <div className="message-container">
                                    {commentMessages[post.id] && (
                                        <div className={`message-container ${commentMessages[post.id].type}-message`}>
                                            {commentMessages[post.id].text}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="toggle-comments-button">
                                <Button
                                    label={visibleComments[post.id] ? "Hide Comments" : "Show Comments"}
                                    icon={visibleComments[post.id] ? "pi pi-chevron-up" : "pi pi-chevron-down"}
                                    onClick={() => toggleCommentsVisibility(post.id)}
                                    className="p-button-sm"
                                />
                            </div>
                            {visibleComments[post.id] && (
                                <div className="comments-section">
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
                                            className="p-button-sm"
                                        />
                                    </div>
                                    {comments[post.id] && comments[post.id].length > 0 ? (
                                        <ul className="comments-list">
                                            {comments[post.id].map((comment, index) => (
                                                <li key={index} className="comment-item">
                                                    <strong>{comment.firstName} {comment.lastName}</strong>: {comment.content}
                                                    <span className="comment-date">
                                                        {new Date(comment.createdAt).toLocaleString()}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No comments yet.</p>
                                    )}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="post-item">No public posts available</p>
            )}
            </div>
        </>
    );
};

export default MainPageCenter;
