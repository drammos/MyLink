using MyLink.Data.Access;
using MyLink.Data.Repository.IRepository;
using MyLink.Models;

namespace MyLink.Data.Repository;

public class CommentRepository: RepositoryBase<Comment>, ICommentRepository
{
    private ApplicationDbContext _context;
    public CommentRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }
}