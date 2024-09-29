import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useGetUserPosts from '../../Services/useGetUserPosts';
import { InputSwitch } from 'primereact/inputswitch';
import useDeletePost from '../../Services/Post/useDeletePost';
import useEditPost from '../../Services/Post/useEditPost';
import useGetPostComments from '../../Services/Post/useGetPostComments';

import { FcLikePlaceholder, FcComments, FcCalendar } from "react-icons/fc";
import './styles/MyPosts.css';

const MyPosts = ({ userInfo }) => {
    const { response, message, errorCode, loading, getPostsRefetch } = useGetUserPosts();
    const { message: deletePostMessage, errorCode: deletePostErrorCode, loading: deletePostLoading, deletePostRefetch } = useDeletePost();
    const { message: editPostMessage, errorCode: editPostErrorCode, editPostRefetch } = useEditPost();
    const { commentsData, message: getPostCommentsMessage, getPostCommentsRefetch } = useGetPostComments();

    const [posts, setPosts] = useState([]);
    const [visibleComments, setVisibleComments] = useState({});
    const [comments, setComments] = useState({});
    const [currentPostId, setCurrentPostId] = useState(null);

    useEffect(() => {
        getPostsRefetch();
    }, [userInfo]);

    useEffect(() => {
        if (response && response.data) {
            setPosts(response.data);
        }
    }, [response]);

    useEffect(() => {
        if (commentsData && currentPostId) {
            setComments(prevComments => ({
                ...prevComments,
                [currentPostId]: commentsData
            }));
        }
    }, [commentsData, currentPostId]);

    const handleVisibilityToggle = (postIndex, isPublic) => {
        const updatedPosts = posts.map((post, index) =>
            index === postIndex ? { ...post, isPublic } : post
        );
        setPosts(updatedPosts);

        const postToUpdate = updatedPosts[postIndex];
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
        if (deletePostErrorCode === 0) {
            setTimeout(() => { getPostsRefetch(); }, 2000);
        }
    }, [deletePostMessage]);

    const toggleCommentsVisibility = (postId) => {
        setVisibleComments(prevState => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));

        if (!comments[postId]) {
            setCurrentPostId(postId);
            getPostCommentsRefetch(postId);
        }
    };

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
                                <button
                                    className="delete-button"
                                    onClick={() => handleDeletePost(post.id)}
                                    disabled={deletePostLoading}
                                >
                                    Delete
                                </button>
                            </div>
                            <div>
                                <p>{post.content}</p>

                                {/* Display pictures if available and not null */}
                                {post.pictureUrls && post.pictureUrls.filter(url => url !== null && url !== 'null').length > 0 && (
                                    <div className="post-pictures">
                                        {post.pictureUrls.filter(url => url !== null).map((url, index) => (
                                            <img key={index} src={url} alt={`Post picture ${index + 1}`} style={{ maxWidth: '100%' }} />
                                        ))}
                                    </div>
                                )}

                                {/* Display videos if available and not null */}
                                {post.videoUrls && post.videoUrls.filter(url => url !== null && url !== 'null').length > 0 && (
                                    <div className="post-videos">
                                        {post.videoUrls.filter(url => url !== null).map((url, index) => (
                                            <video key={index} controls style={{ maxWidth: '100%' }}>
                                                <source src={url} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        ))}
                                    </div>
                                )}

                                {/* Display voice files if available and not null */}
                                {post.voiceUrls && post.voiceUrls.filter(url => url !== null && url !== 'null').length > 0 && (
                                    <div className="post-voice">
                                        {post.voiceUrls.filter(url => url !== null).map((url, index) => (
                                            <audio key={index} controls>
                                                <source src={url} type="audio/mpeg" />
                                                Your browser does not support the audio tag.
                                            </audio>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="post-info">
                                <button
                                    className="comments-count-button"
                                    onClick={() => toggleCommentsVisibility(post.id)}
                                >
                                    <FcComments /> {post.commentsCount} comments
                                </button>
                                <span><FcLikePlaceholder /> {post.reactionsCount} reactions</span>
                                <span><FcCalendar /> Created on: {new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>

                            {visibleComments[post.id] && (
                                <div className="comments-section">
                                    {comments[post.id] && comments[post.id].length > 0 ? (
                                        <ul className="comments-list">
                                            {comments[post.id].map((comment, commentIndex) => (
                                                <li key={commentIndex} className="comment-item">
                                                    <strong>{comment.firstName} {comment.lastName}</strong>: {comment.content}
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
                <p className="post-item">No posts available</p>
            )}
        </div>
    );
};

MyPosts.propTypes = {
    userInfo: PropTypes.shape({
        posts: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            content: PropTypes.string,
            createdAt: PropTypes.string,
            isPublic: PropTypes.bool,
            videoUrl: PropTypes.string,
            voiceUrl: PropTypes.string,
            reactionsCount: PropTypes.number,
        }))
    }).isRequired,
};

export default MyPosts;