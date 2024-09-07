using Microsoft.AspNetCore.Mvc;
using MyLink.Data.Repository.IRepository;
using MyLink.Models.DTOS;
using MyLink.Models;
using Microsoft.AspNetCore.Identity;

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
                PostedDate = createJobDTO.PostedDate,
                UserId = createJobDTO.UserId
            };

            _unitOfWork.Job.Add(job);
            _unitOfWork.Save();
            return job;
        }

        [HttpGet("GetAllJobs")]
        public async Task<ActionResult<List<Job>>> GetAllJobs()
        {
            return _unitOfWork.Job.GetAll().ToList();
        }


        [HttpGet("GetUserPostedJobs")]
        public async Task<ActionResult<List<Job>>> GetUserPostedJobs([FromQuery] string userId)
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

        [HttpPost("ApplyForJob")]
        public async Task<ActionResult<JobApplication>> ApplyForJob([FromForm] ApplyForJobDTO applyForJobDTO)
        {
            User user = await _userManager.FindByNameAsync(applyForJobDTO.Username);
            if (user == null) return NotFound();

            Job job = _unitOfWork.Job.FirstOrDefault(j => j.Id == applyForJobDTO.JobId);
            JobApplication jobApplication = new JobApplication()
            {
                JobId = applyForJobDTO.JobId,
                Username = applyForJobDTO.Username,
                CoverLetter = applyForJobDTO.CovverLetter,
                AppliedDate = DateTime.Now,
                Status = JobApplicationStatus.Pending
            };

            //_unitOfWork.Job
            return jobApplication;
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
            bool v = await _unitOfWork.Job.AcceptedJobApplication(jobApplicationId);
            if (!v) return NotFound(); 
            return StatusCode(200);
        }
    }
}