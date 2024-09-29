using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyLink.Data.Repository.IRepository;
using MyLink.Models;
using Microsoft.AspNetCore.Identity;
using MyLink.Models;
using MyLink.Models.DTOS;

namespace WebAppMyLink.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ViewedJobsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<User> _userManager;

        public ViewedJobsController(IUnitOfWork unitOfWork, UserManager<User> userManager)
        {
            _unitOfWork = unitOfWork;
            _userManager = userManager;
        }

        [HttpPost("PostViewedJobs")]
        [Authorize]
        public async Task<IActionResult> PostViewedJobs([FromForm] ViewedJobDTO viewedJobDTO)
        {
            User user = await _userManager.FindByIdAsync(viewedJobDTO.UserId);
            if(user==null) return NotFound();
            ViewedJobs viewedJob = new ViewedJobs
            {
                Username = user.UserName, 
                JobId = viewedJobDTO.JobId,   
            };
            _unitOfWork.ViewedJobs.Add(viewedJob);
            _unitOfWork.Save();
            return StatusCode(200);
        }
    }
}