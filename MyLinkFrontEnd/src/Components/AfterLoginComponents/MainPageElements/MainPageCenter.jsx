import { useState, useEffect } from "react";
import { FaUserCircle, FaThumbsUp, FaGlobe, FaRegCommentAlt } from "react-icons/fa";
import './styles/MainPageCenter.css';
import CreatePostComponent from "./CreatePostCompoment";
import useGetUserPosts from '../../Services/useGetUserPosts';
//import { array } from "prop-types";

const MainPageCenter = () => {
    const { response, message, errorCode, loading, getPostsRefetch } = useGetUserPosts();
    const [posts, setPosts] = useState([]);
    const [usersOfPosts, setUsersOfPosts] = useState([]); 
    const [postsNumber, setPostsNumber] = useState([]);

    useEffect(() => {
        getPostsRefetch(); 
    },[]); 

    useEffect(() => {
        const fetchPostsWithUsers = async () => {
            if (response) {
                setPosts(response.data);
            }
        };
        fetchPostsWithUsers();
    }, [response]);

    useEffect(() => {
        console.log("posts are: ", posts);
        setPostsNumber(posts.length);
    }, [posts]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    return (
        <div className="main-page-center">
            <CreatePostComponent />

            {loading && <p>Loading posts...</p>}
            {
                (postsNumber > 0) ? (
                posts.map((post) => (
                    <div key={post.id} className="show-post-container">
                        <div className="show-account-name">
                            {/*{post.photoURL ? (*/}
                            {/*    <img*/}
                            {/*        src={post.user.photoURL}*/}
                            {/*        alt={`${post.user.firstName} ${post.user.lastName}`}*/}
                            {/*        className="user-profile-photo"*/}
                            {/*        style={{ width: '2rem', height: '2rem', borderRadius: '50%' }}*/}
                            {/*    />*/}
                            {/*) : (*/}
                            {/*    <FaUserCircle size="2rem" color="rgba(0, 0, 0, 0.6)" />*/}
                            {/*)}*/}
                            {/*<div className="account-details">*/}
                            {/*    <b>{post.user.firstName} {post.user.lastName}</b>&nbsp;*/}
                            {/*    <span className="small-icon">●</span>&nbsp;1st*/}
                            {/*    <br />*/}
                            {/*    <p>*/}
                            {/*        {formatDate(post.createdAt)}&nbsp;*/}
                            {/*        <span className="small-icon">●</span>*/}
                            {/*        {post.updateAt !== post.createdAt ? ' Edited ' : ' '}*/}
                            {/*        <span className="small-icon">●</span> <FaGlobe />*/}
                            {/*    </p>*/}
                            {/*</div>*/}
                        </div>
                        <div className="post-content">
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            {post.pictureUrls && post.pictureUrls.length > 0 && (
                                <div className="post-images">
                                    {post.pictureUrls.map((url, index) => (
                                        <img key={index} src={url} alt={`Post image ${index + 1}`} />
                                    ))}
                                </div>
                            )}
                            {post.videoUrls && post.videoUrls.length > 0 && (
                                <div className="post-videos">
                                    {post.videoUrls.map((url, index) => (
                                        <video key={index} controls>
                                            <source src={url} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="show-activity">
                            <FaThumbsUp />&nbsp;{post.reactionsCount} {post.reactionsCount === 1 ? 'reaction' : 'reactions'}
                            &nbsp;|&nbsp;
                            <FaRegCommentAlt />&nbsp;{post.commentsCount} {post.commentsCount === 1 ? 'comment' : 'comments'}
                        </div>
                        <div className="post-actions">
                            <button className={`like-button ${post.isLikedByCurrentUser ? 'liked' : ''}`}>
                                <FaThumbsUp /> Like
                            </button>
                            <button className="comment-button">
                                <FaRegCommentAlt /> Comment
                            </button>
                        </div>
                        {post.comments && post.comments.length > 0 && (
                            <div className="comments-section">
                                <h4>Comments</h4>
                                {post.comments.map((comment) => (
                                    <div key={comment.id} className="comment">
                                        <p><strong>{comment.username}</strong>: {comment.content}</p>
                                        <small>{formatDate(comment.createdAt)}</small>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )))
                :
                (
                    <p>No posts available</p> // Render a message when no posts exist
                )
            
            }
        </div>
    );
};

export default MainPageCenter;