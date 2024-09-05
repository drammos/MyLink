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

            _unitOfWork.Job
        }
    }
}