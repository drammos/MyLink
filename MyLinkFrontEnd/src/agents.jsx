export const agents = {
    frontLocalhost: 'http://localhost:4173',
    localhost: 'https://localhost:44329/api/',
    // User
    registerUser: 'User/RegisterUser',
    loginUser: 'User/LoginUser',
    getUser: 'User/GetUser',
    updateUser: 'User/UpdateUser',
    getListFromInComingRequests: 'User/GetListFromInComingRequests',
    deleteUser: 'User/DeleteUser',
    getAllUsers: 'User/GetAllUsers',
    getRoleForUser: 'User/GetRoleForUser',
    isConnectedUsers: 'User/IsConnectedUsers',
    isPendingRequest: 'User/IsPendingRequest',
    isInComingRequest: 'User/IsInComingRequest',
    requestToConnection: 'User/RequestToConnection',
    acceptRequest: 'User/AcceptRequest',
    deleteRequest: 'User/DeleteRequest',
    getListFromConnections: 'User/GetListFromConnections',
    getListFromPendingRequests: 'User/GetListFromPendingRequests',
    searchUsers: 'User/SearchUsers',
    getCommunicationType : 'User/GetCommunicationType',

    // Post
    createPost: 'Post/CreatePost',
    getUserPosts: 'Post/GetUserPosts',
    editPost: 'Post/EditPost',
    deletePost: 'Post/DeletePost',
    createComment: 'Post/CreateComment',
    getPostComments: 'Post/GetPostComments',
    getUserComments: 'Post/GetUserComments',
    deleteAllCommentsFromPost: 'Post/DeleteAllCommentsFromPost',
    deleteComment: 'Post/DeleteComment',
    createReaction: 'Post/CreateReaction',
    getPostReactions: 'Post/GetPostReactions',
    getUserReactions: 'Post/GetUserReactions',
    deleteAllReactionsFromPost: 'Post/DeleteAllReactionsFromPost',
    deleteReaction: 'Post/DeleteReaction',
    getPostsFromConnectedUsers: 'Post/GetPostsFromConnectedUsers',
    getPostsFromOtherUsers: 'Post/GetPostsFromOtherUsers',


    // Job
    createJob: 'Job/CreateJob',
    editJob: 'Job/EditJob',
    deleteJob: 'Job/DeleteJob',
    getJob: 'Job/GetJob',
    getAllJobs: 'Job/GetAllJobs',
    getAllOpenJobs: 'Job/GetAllOpenJobs',
    getAllCloseJobs: 'Job/GetAllCloseJobs',
    applyForJob: 'Job/ApplyForJob',
    getUserPostedJobs: 'Job/GetUserPostedJobs',
    getAppliedUserJobs: 'Job/GetAppliedUserJobs',
    getUserStatusJobs: 'Job/GetUserStatusJobs',
    acceptedJobApplication: 'Job/AcceptedJobApplication',
    rejectJobApplication: 'Job/RejectJobApplication',
    withdrawnJobApplication: 'Job/WithdrawnJobApplication',
    getFilteredJobs: 'Job/GetFilteredJobs',
    closeJob: 'Job/CloseJob',

    // Experience
    addExperience: 'Experience/AddExperience',
    getExperiences: 'Experience/GetExperiences',
    getExperience: 'Experience/GetExperience',
    editExperience: 'Experience/EditExperience',
    deleteExperience: 'Experience/DeleteExperience',

    // Education
    addEducation: 'Education/AddEducation',
    getEducations: 'Education/GetEducations',
    getEducation: 'Education/GetEducation',
    editEducation: 'Education/EditEducation',
    deleteEducation: 'Education/DeleteEducation',

    //Messages
    postMessage: 'User/AddMessage',
    getMessage: 'User/GetMessage',
    getDiscussion: 'User/GetDiscussion',
    getChats: 'User/GetUserChats',
    getUserConnectedChats: 'User/GetUserConnectedChats',
    getDiscussionWithoutPagination: 'User/GetDiscussionWithoutPagination',

    //Viewed POST
    addViewedPost: 'ViewedPosts/PostViewedPosts',

    //Viewed JOB
    addViewedJob: 'ViewedJobs/PostViewedJobs',

    //Matrix Factorization
    getProposedPosts: 'Matrix/GetProposedPosts',
    getProposedJobs: 'Matrix/GetPreposedJobs'
};