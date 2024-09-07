using MyLink.Models;
using MyLink.Models.DTOS;

namespace MyLink.Data.Repository.IRepository
{
    public interface IJobRepository : IRepositoryBase<Job>
    {
        public Job Update(UpdateJobDTO updateJobDTO);
        public Task<List<JobApplication>> GetUserAppliedJobs(string username);
        public Task<List<JobApplication>> GetUserStatusJobs(string username, JobApplicationStatus status = JobApplicationStatus.Pending);
        public Task<bool> AcceptedJobApplication(int jobApplicationId);
    }
}
