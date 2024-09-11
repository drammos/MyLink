import React from "react";
import './styles/MainPageCenter.css'

const MainPageCenter = () => {
    return (
        <div className="main-page-center">
            <div className="new-post-container">
                <div className="new-post">
                    <button type="button" className="new-post-btn">
                        <i className="fa fa-edit"></i>&nbsp;Start a post
                    </button>
                    <button type="button" className="share-media">
                        <i className="fa fa-file-alt"></i>
                    </button>
                    <button type="button" className="share-media">
                        <i className="fa fa-video"></i>
                    </button>
                    <button type="button" className="share-media">
                        <i className="fa fa-camera"></i>
                    </button>
                </div>
                <div className="article">
                    <a href="#" className="article-link">Write an article</a>&nbsp;on LinkedIn
                </div>
            </div>

            <div className="sort-posts">
                <a className="sort-link" href="#">
                    <hr className="sort-line" />
                    Sort by:&nbsp;<span className="sort-selection">Top</span>
                </a>

                <div className="dropdown-menu">
                    <a className="dropdown-item" href="#">Top</a>
                    <a className="dropdown-item" href="#">Recent</a>
                </div>
            </div>

            <br />

            <div className="show-post-container">
                <div className="show-comment">
                    <b>Your connection&nbsp;</b>commented/reacted on this
                </div>
                <div className="show-account-name">
                    <a href="#">
                        <i className="fas fa-user-circle fa-4x" style={{ color: "rgba(0,0,0,.6)" }}></i>
                        <div className="account-details">
                            <b>User Name</b>&nbsp;
                            <i className="fas fa-circle small-icon"></i>&nbsp;1st
                            <br />
                            <p>User bio</p>
                            <p>
                                8h <i className="fas fa-circle small-icon"></i> Edited/None{" "}
                                <i className="fas fa-circle small-icon"></i> <i className="fas fa-globe"></i>
                            </p>
                        </div>
                    </a>
                </div>
                <div>
                    <p>Lorem Ipsum text describing the post goes here. This is where the content of the post is displayed.</p>
                </div>
                <div className="show-activity">
                    <i className="fas fa-thumbs-up"></i>&nbsp;You and&nbsp;
                    <a href="#"><b>n</b></a>&nbsp;others
                </div>
            </div>
        </div>
    );
};

export default MainPageCenter;
