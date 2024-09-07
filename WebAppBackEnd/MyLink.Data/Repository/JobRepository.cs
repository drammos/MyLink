﻿using MyLink.Data.Access;
using MyLink.Models.DTOS;
using MyLink.Models;
using MyLink.Data.Repository.IRepository;
using Microsoft.EntityFrameworkCore;

namespace MyLink.Data.Repository
{
    public class JobRepository : RepositoryBase<Job>, IJobRepository
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
            job.Category = updateJobDTO.Category;

            return job;
        }

        public async Task<List<JobApplication>> GetUserAppliedJobs(string username)
        {
            return await _context.Jobs
                .SelectMany(j => j.JobApplications)
                .Where(ja => ja.Username == username)
                .ToListAsync();
        }

        public async Task<List<JobApplication>> GetUserStatusJobs(string username, JobApplicationStatus status = JobApplicationStatus.Pending)
        {
            return await _context.Jobs
                .SelectMany(j => j.JobApplications)
                .Where(ja => ja.Username == username && ja.Status == status)
                .ToListAsync();
        }

        public bool ApplyForJob(JobApplication jobApplication)
        {
            var jobId = jobApplication.Id;
            var job = _context.Jobs.FirstOrDefault(p => p.Id == jobId);
            if (job == null) return false;

            job.JobApplications.Add(jobApplication);
            return true;
        }

        public async Task<bool> AcceptedJobApplication(int jobApplicationId)
        {
            var jobApplication = await _context.JobApplications
                .FindAsync(jobApplicationId);
            if (jobApplication == null) return false;

            jobApplication.Status = JobApplicationStatus.Accepted;
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> RejectJobApplication(int jobApplicationId)
        {
            var jobApplication = await _context.JobApplications
                .FindAsync(jobApplicationId);
            if (jobApplication == null) return false;

            jobApplication.Status = JobApplicationStatus.Rejected;
            await _context.SaveChangesAsync();

            return true;
        }
        
        public async Task<bool> WithdrawnJobApplication(int jobApplicationId)
        {
            var jobApplication = await _context.JobApplications
                .FindAsync(jobApplicationId);
            if (jobApplication == null) return false;

            jobApplication.Status = JobApplicationStatus.Withdrawn;
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAllJobApplications(int jobId)
        {
            var job = await _context.Jobs
                .Include(j => j.JobApplications)
                .FirstOrDefaultAsync(j => j.Id == jobId);
            if(job == null) return false;
            
            job.JobApplications.Clear();
            await _context.SaveChangesAsync();
            return true;
        }

    }
}