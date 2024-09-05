using MyLink.Models;
using MyLink.Models.DTOS;

namespace MyLink.Data.Repository.IRepository
{
    public interface IJobRepository : IRepositoryBase<Job>
    {
        public Job Update(UpdateJobDTO updateJobDTO);
    }
}
