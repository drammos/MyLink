using MyLink.Data.Repository.IRepository;
using MyLink.Models;
using MyLink.Data.Access;

namespace MyLink.Data.Repository;

public class ViewedJobsRepository : RepositoryBase<ViewedJobs>, IViewedJobsRepository
{
    private ApplicationDbContext _context;
    public ViewedJobsRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }
}