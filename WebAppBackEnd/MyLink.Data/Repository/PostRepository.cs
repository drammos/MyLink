using MyLink.Models.DTOS;
using MyLink.Models;
using MyLink.Data.Access;
using MyLink.Data.Repository.IRepository;
using Microsoft.EntityFrameworkCore;

namespace MyLink.Data.Repository
{
    public class PostRepository : RepositoryBase<Post>, IPostRepository
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
            post.VoiceUrls = updatePostDTO.VoiceUrls;
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
            post.CommentsCount++;
            return true;
        }

        public async Task<bool> DeleteAllCommentsFromPost(int postId)
        {
            var post = await _context.Posts
                .Include(p => p.Comments)
                .FirstOrDefaultAsync(p => p.Id == postId);

            if (post == null) return false;

            post.Comments.Clear();
            post.CommentsCount = 0;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteComment(int commentId)
        {
            var postWithComment = await _context.Posts
                .Include(p => p.Comments)
                .FirstOrDefaultAsync(p => p.Comments.Any(c => c.Id == commentId));

            if (postWithComment == null) return false;

            var commentToRemove = postWithComment.Comments.FirstOrDefault(c => c.Id == commentId);
            if (commentToRemove == null) return false;

            postWithComment.Comments.Remove(commentToRemove);
            postWithComment.CommentsCount--;

            await _context.SaveChangesAsync();
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

        public async Task<List<Comment>> GetUserComments(string username)
        {
            var comments = await _context.Posts
                .SelectMany(p => p.Comments)
                .ToListAsync();

            if (comments == null) return null;
            
            List<Comment> userComments = [];
            foreach(var comment in comments)
            {
                if (username.Equals(comment.Username))
                    userComments.Add(comment);
            }
            return userComments;
        }

        public bool AddReaction(Reaction reaction)
        {
            var id = reaction.PostId;
            var post = _context.Posts.FirstOrDefault(p => p.Id == id);
            if (post == null) return false;

            post.Reactions.Add(reaction);
            post.ReactionsCount++;
            return true;
        }

        public async Task<bool> DeleteAllReactionsFromPost(int postId)
        {
            var post = await _context.Posts
                .Include(p => p.Reactions)
                .FirstOrDefaultAsync(p => p.Id == postId);

            if (post == null) return false;

            post.Reactions.Clear();
            post.ReactionsCount = 0;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteReaction(int reactionId)
        {
            var postWithReaction = await _context.Posts
                .Include(p => p.Reactions)
                .FirstOrDefaultAsync(p => p.Reactions.Any(c => c.Id == reactionId));

            if (postWithReaction == null) return false;

            var reactionToRemove = postWithReaction.Reactions.FirstOrDefault(c => c.Id == reactionId);
            if (reactionToRemove == null) return false;

            postWithReaction.Reactions.Remove(reactionToRemove);
            postWithReaction.ReactionsCount--;

            await _context.SaveChangesAsync();
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

        public async Task<List<Reaction>> GetUserReactions(string username)
        {
            var reactions = await _context.Posts
                .SelectMany(p => p.Reactions)
                .ToListAsync();

            if (reactions == null) return null;

            List<Reaction> userReactions = [];
            foreach (var reaction in reactions)
            {
                if (username.Equals(reaction.Username))
                    userReactions.Add(reaction);
            }
            return userReactions;
        }

        public async Task<List<Post>> GetPostsFromConnectedUsers(List<string> userIdList)
        {
            var posts = await _context.Posts
                .Where(p => userIdList.Contains(p.UserId))
                .OrderByDescending(p => !p.UpdateAt.HasValue ? p.CreatedAt : p.UpdateAt)
                .ToListAsync();
    
            return posts;
        }
    }
}
