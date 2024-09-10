using Microsoft.AspNetCore.Mvc;
using MyLink.Data.Repository.IRepository;
using MyLink.Models.DTOS;
using MyLink.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace WebAppMyLink.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class JobController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<User> _userManager;

        public JobController(IUnitOfWork unitOfWork, UserManager<User> userManager)
        {
            _unitOfWork = unitOfWork;
            _userManager = userManager;
        }

        [HttpPost("CreateJob")]
        public async Task<ActionResult<Job>> CreateJob([FromForm] CreateJobDTO createJobDTO)
        {
            User user = await _userManager.FindByIdAsync(createJobDTO.UserId);
            if (user == null) return NotFound();

            Job job = new Job()
            {
                Title = createJobDTO.Title,
                CompanyName = createJobDTO.CompanyName,
                Description = createJobDTO.Description,
                Location = createJobDTO.Location,
                WorkType = createJobDTO.WorkType,
                LocationType = createJobDTO.LocationType,
                Category = createJobDTO.Category,
                PostedDate = DateTime.Now,
                IsActive = true,
                UserId = createJobDTO.UserId
            };

            _unitOfWork.Job.Add(job);
            _unitOfWork.Save();
            return job;
        }

        [HttpPut("EditJob")]
        public ActionResult<Job> EditJob([FromForm] UpdateJobDTO updateJobDTO)
        {
            Job job = _unitOfWork.Job.Update(updateJobDTO);
            if(job == null) return NotFound();
            _unitOfWork.Save();
            return job;
        }
        
        [HttpDelete("DeleteJob")]
        public async Task<ActionResult<Job>> DeleteJob([FromQuery] int jobId)
        {
            var job = _unitOfWork.Job.FirstOrDefault(j => j.Id == jobId);
            if (job == null) return NotFound();

            await _unitOfWork.Job.DeleteAllJobApplications(jobId);
            _unitOfWork.Job.Delete(job);
          
            _unitOfWork.Save();
            return StatusCode(200);
        }

        [HttpGet("GetJob")]
        public ActionResult<Job> GetJob([FromQuery] int jobId)
        {
            var job = _unitOfWork.Job.FirstOrDefault(j => j.Id == jobId);
            if(job == null) return NotFound();
            return job;
        }
        
        [HttpGet("GetAllJobs")]
        public ActionResult<List<Job>> GetAllJobs()
        {
            return _unitOfWork.Job.GetAll().ToList();
        }

        [HttpGet("GetAllOpenJobs")]
        public ActionResult<List<Job>> GetAllOpenJobs()
        {
            return _unitOfWork.Job.GetOpenJobs();
        }
        
        [HttpGet("GetAllCloseJobs")]
        public ActionResult<List<Job>> GetAllCloseJobs()
        {
            return _unitOfWork.Job.GetCloseJobs();
        }
        
        [HttpPost("ApplyForJob")]
        public async Task<ActionResult<JobApplication>> ApplyForJob([FromForm] ApplyForJobDTO applyForJobDTO)
        {
            User user = await _userManager.FindByNameAsync(applyForJobDTO.Username);
            if (user == null) return NotFound();

            JobApplication jobApplication = new JobApplication()
            {
                JobId = applyForJobDTO.JobId,
                Username = applyForJobDTO.Username,
                CoverLetter = applyForJobDTO.CoverLetter,
                AppliedDate = DateTime.Now,
                Status = JobApplicationStatus.Pending
            };

            bool result = _unitOfWork.Job.ApplyForJob(jobApplication);
            if (!result) return NotFound();

            _unitOfWork.Save();
            return jobApplication;
        }
        
        [HttpGet("GetUserPostedJobs")]
        public ActionResult<List<Job>> GetUserPostedJobs([FromQuery] string userId)
        {
            IEnumerable<Job> list = _unitOfWork.Job.GetAll();

            List<Job> jobs = new List<Job>();
            foreach (Job job in list)
            {
                if (userId.Equals(job.UserId))
                    jobs.Add(job);
            }
            return jobs;
        }

        [HttpGet("GetAppliedUserJobs")]
        public async Task<ActionResult<List<JobApplication>>> GetAppliedUserJobs([FromQuery] string username)
        {
            User user = await _userManager.FindByNameAsync(username);
            if (user == null) return NotFound();

            return await _unitOfWork.Job.GetUserAppliedJobs(username);
        }

        [HttpGet("GetUserStatusJobs")]
        public async Task<ActionResult<List<JobApplication>>> GetUserStatusJobs([FromQuery] string username, [FromQuery] string statusJobApplication)
        {
            User user = await _userManager.FindByNameAsync(username);
            if (user == null) return NotFound();

            switch (statusJobApplication)
            {
                case "Pending":
                    return await _unitOfWork.Job.GetUserStatusJobs(username, JobApplicationStatus.Pending);

                case "Accepted":
                    return await _unitOfWork.Job.GetUserStatusJobs(username, JobApplicationStatus.Accepted);

                case "Rejected":
                    return await _unitOfWork.Job.GetUserStatusJobs(username, JobApplicationStatus.Rejected);

                case "Withdrawn":
                    return await _unitOfWork.Job.GetUserStatusJobs(username, JobApplicationStatus.Withdrawn);

                default:
                    return await _unitOfWork.Job.GetUserStatusJobs(username);
            }
        }

        [HttpPut("AcceptedJobApplication")]
        public async Task<ActionResult> AcceptedJobApplication([FromQuery] int jobApplicationId)
        {
            bool result = await _unitOfWork.Job.AcceptedJobApplication(jobApplicationId);
            if (!result) return NotFound(); 
            
            return StatusCode(200);
        }

        [HttpPut("RejectJobApplication")]
        public async Task<ActionResult> RejectJobApplication([FromQuery] int jobApplicationId)
        {
            bool result = await _unitOfWork.Job.RejectJobApplication(jobApplicationId);
            if (!result) return NotFound(); 
            
            return StatusCode(200);
        }
        
        [HttpPut("WithdrawnJobApplication")]
        public async Task<ActionResult> WithdrawnJobApplication([FromQuery] int jobApplicationId)
        {
            bool result = await _unitOfWork.Job.WithdrawnJobApplication(jobApplicationId);
            if (!result) return NotFound(); 
            
            return StatusCode(200);
        }

        [HttpGet("GetFilteredJobs")]
        public async Task<ActionResult<List<Job>>> GetFilteredJobs([FromQuery] FilterJobsDTO filterJobsDTO)
        {
            User user = await _userManager.FindByIdAsync(filterJobsDTO.UserId);
            if(user == null) return NotFound();
            
            return _unitOfWork.Job.GetSortingJobs(filterJobsDTO).ToList();
        }

        [HttpPut("CloseJob")]
        public ActionResult CloseJob([FromQuery] int jobId)
        {
            return !_unitOfWork.Job.CloseJob(jobId) ? NotFound() : StatusCode(200);
        } 
    }
}