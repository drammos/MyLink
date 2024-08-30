using MyLink.Models.DTOS;
using MyLink.Models;
using MyLink.Data.Access;
using MyLink.Data.Repository.IRepository;
using Microsoft.EntityFrameworkCore;

namespace MyLink.Data.Repository
{
    internal class PostRepository : RepositoryBase<Post>, IPostRepository
    { 
        private ApplicationDbContext _context;

        public PostRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }
    
        public Post Update(UpdatePostDTO updatePostDTO)
        {
            var id = updatePostDTO.Id;
            var post = _context.Posts.FirstOrDefault(u => u.Id == id);
            if (post == null)
            {
                return null;
            }

            post.Title = updatePostDTO.Title;
            post.UpdateAt = updatePostDTO.UpdateAt;
            post.VideoUrls = updatePostDTO.VideoUrls;
            post.PictureUrls = updatePostDTO.PictureUrls;
            post.Content = updatePostDTO.Content;
            post.IsLikedByCurrentUser = updatePostDTO.IsLikedByCurrentUser;

            return post;
        }

        public bool AddComment(Comment comment)
        {
            var id = comment.PostId;
            var post = _context.Posts.FirstOrDefault(p => p.Id == id);
            if (post == null) return false;

            post.Comments.Add(comment);
            return true;
        }

        public bool DeleteComment(int postId, int commentId)
        {
            var post = _context.Posts.FirstOrDefault(p => p.Id == postId);
            if (post == null) return false;

            var comment = post.Comments.FirstOrDefault(c => c.Id == commentId);
            if (comment == null) return false;

            post.Comments.Remove(comment);
            return true;
        }

        public async Task<List<Comment>> GetComments(int postId)
        {
            var comments = await _context.Posts
                .Include(x => x.Comments)
                .FirstOrDefaultAsync(x => x.Id == postId);

            if (comments == null) return null;
            return [.. comments!.Comments];
        }

        public async Task<List<Comment>> GetUserComments(string userId)
        {
            var comments = await _context.Posts
                .Include(x => x.Comments)
                .FirstOrDefaultAsync(x => x.UserId == userId);
            
            if (comments == null) return null;
            return [.. comments!.Comments];
        }

        public bool AddReaction(Reaction reaction)
        {
            var id = reaction.PostId;
            var post = _context.Posts.FirstOrDefault(p => p.Id == id);
            if (post == null) return false;

            post.Reactions.Add(reaction);
            return true;
        }
        public bool DeleteReaction(int postId, int reactionId)
        {
            var post = _context.Posts.FirstOrDefault(p => p.Id == postId);
            if (post == null) return false;

            var reaction = post.Reactions.FirstOrDefault(c => c.Id == reactionId);
            if (reaction == null) return false;

            post.Reactions.Remove(reaction);
            return true;
        }
        public async Task<List<Reaction>> GetReactions(int postId)
        {
            var reactions = await _context.Posts
                .Include(x => x.Reactions)
                .FirstOrDefaultAsync(x => x.Id == postId);

            if (reactions == null) return null;
            return [.. reactions!.Reactions];
        }

        public async Task<List<Reaction>> GetUserReactions(string userId)
        {
            var reactions = await _context.Posts
                .Include(x => x.Reactions)
                .FirstOrDefaultAsync(x => x.UserId == userId);

            if (reactions == null) return null;
            return [.. reactions!.Reactions];
        }
    }
}
