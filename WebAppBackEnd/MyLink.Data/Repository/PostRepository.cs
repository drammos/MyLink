using MyLink.Models.DTOS;
using MyLink.Models;
using MyLink.Data.Access;
using MyLink.Data.Repository.IRepository;

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
    }
}
