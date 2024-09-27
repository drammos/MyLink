using MyLink.Data.Repository.IRepository;
using MyLink.Models;
using MyLink.Data.Access;

namespace MyLink.Data.Repository;

public class ViewedPostsRepository : RepositoryBase<ViewedPosts>, IViewedPostsRepository
{
    private ApplicationDbContext _context;
    public ViewedPostsRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }
}