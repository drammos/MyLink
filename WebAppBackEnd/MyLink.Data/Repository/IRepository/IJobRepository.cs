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
        public IQueryable<Job> GetOpenJobs();
        public IQueryable<Job> GetCloseJobs();
        public IQueryable<Job> GetSortingJobs(FilterJobsDTO filterJobsDTO);
        public Task<List<JobApplication>> GetJobApplications(int jobId);
        public Task<List<Job>> LoadAllJobs();
        public Task<List<Job>> GetJobsForMatrix(string UserId);
    }
}
