using MyLink.Data.Access;
using MyLink.Models.DTOS;
using MyLink.Models;
using MyLink.Data.Repository.IRepository;

namespace MyLink.Data.Repository
{
    public class JobRepository : RepositoryBase<Post>, IJobRepository
    {
        private ApplicationDbContext _context;

        public JobRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public Job Update(UpdateJobDTO updateJobDTO)
        {
            var id = updateJobDTO.Id;
            var job = _context.Jobs.FirstOrDefault(u => u.Id == id);
            if (job == null) return null;

            job.Title = updateJobDTO.Title;
            job.Description = updateJobDTO.Description;
            job.CompanyName = updateJobDTO.CompanyName;
            job.WorkType = updateJobDTO.WorkType;
            job.Location = updateJobDTO.Location;
            job.LocationType = updateJobDTO.LocationType;

            return job;
        }
    }
}
