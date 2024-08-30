using MyLink.Models;
using MyLink.Models.DTOS;

namespace MyLink.Data.Repository.IRepository
{
    public interface IPostRepository : IRepositoryBase<Post>
    {
        public Post Update(UpdatePostDTO updatePostDTO);
        public bool AddComment(Comment comment);
        public bool DeleteComment(int postId, int commentId);
        public Task<List<Comment>> GetComments(int postId);
        public Task<List<Comment>> GetUserComments(string userId);
        public bool AddReaction(Reaction reaction);
        public bool DeleteReaction(int postId, int reactionId);
        public Task<List<Reaction>> GetReactions(int postId);
        public Task<List<Reaction>> GetUserReactions(string userId);
    }
}
