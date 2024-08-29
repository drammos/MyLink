using MyLink.Models;
using MyLink.Models.DTOS;

namespace MyLink.Data.Repository.IRepository
{
    public interface IPostRepository : IRepositoryBase<Post>
    {
        public Post Update(UpdatePostDTO updatePostDTO);
        public bool AddComment(Comment comment);
    }
}
