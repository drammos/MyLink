using MyLink.Models;
using MyLink.Models.DTOS;

namespace MyLink.Data.Repository.IRepository
{
    public interface IPostRepository : IRepositoryBase<Post>
    {
        public Post Update(UpdatePostDTO updatePostDTO);
        public bool AddComment(Comment comment);
        public Task<bool> DeleteAllCommentsFromPost(int postId);
        public Task<bool> DeleteComment(int commentId);
        public Task<List<Comment>> GetComments(int postId);
        public Task<List<Comment>> GetUserComments(string username);
        public bool AddReaction(Reaction reaction);
        public Task<bool> DeleteAllReactionsFromPost(int postId);
        public Task<bool> DeleteReaction(int reactionId);
        public Task<List<Reaction>> GetReactions(int postId);
        public Task<List<Reaction>> GetUserReactions(string username);
        public Task<List<Post>> GetPostsFromConnectedUsers(List<string> userIdList);
    }
}
