using MyLink.Data.Access;
using MyLink.Data.Repository.IRepository;
using MyLink.Models;

namespace MyLink.Data.Repository;

public class JobApplicationsRepository : RepositoryBase<JobApplication>, IJobApplicationsRepository
{
    private ApplicationDbContext _context;

    public JobApplicationsRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }
}