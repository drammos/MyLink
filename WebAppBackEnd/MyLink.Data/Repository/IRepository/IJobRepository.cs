using MyLink.Models;
using MyLink.Models.DTOS;

namespace MyLink.Data.Repository.IRepository
{
    public interface IJobRepository : IRepositoryBase<Job>
    {
        public Job Update(UpdateJobDTO updateJobDTO);
        public bool CloseJob(int jobId);
        public Task<List<JobApplication>> GetUserAppliedJobs(string username);
        public Task<List<JobApplication>> GetUserStatusJobs(string username, JobApplicationStatus status = JobApplicationStatus.Pending);
        public bool ApplyForJob(JobApplication jobApplication);
        public Task<bool> AcceptedJobApplication(int jobApplicationId);
        public Task<bool> RejectJobApplication(int jobApplicationId);
        public Task<bool> WithdrawnJobApplication(int jobApplicationId);
        public Task<bool> DeleteAllJobApplications(int jobApplicationId);
        public List<Job> GetOpenJobs();
        public List<Job> GetCloseJobs();
        public List<Job> GetSortingJobs(FilterJobsDTO filterJobsDTO);
    }
}
