using MyLink.Data.Access;
using MyLink.Models.DTOS;
using MyLink.Models;

namespace MyLink.Data.Repository
{
    public class JobRepository : RepositoryBase<Post>, IJobRepository
    {
        private ApplicationDbContext _context;

        public JobRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public Post Update(UpdateJobDTO updateJobDTO)
        {
            var id = updateJobDTO.Id;
            var post = _context.Jobs.FirstOrDefault(u => u.Id == id);
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
    }
}
