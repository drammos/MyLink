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
    public class ViewedPostsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<User> _userManager;

        public ViewedPostsController(IUnitOfWork unitOfWork, UserManager<User> userManager)
        {
            _unitOfWork = unitOfWork;
            _userManager = userManager;
        }

        [HttpPost("PostViewedPosts")]
        [Authorize]
        public async Task<IActionResult> PostViewedPosts([FromForm] ViewedPostDTO viewedPostDTO)
        {
            User user = await _userManager.FindByIdAsync(viewedPostDTO.UserId);
            if(user==null) return NotFound();
            ViewedPosts viewedPost = new ViewedPosts
            {
                Username = user.UserName, 
                PostId = viewedPostDTO.PostId,   
            };
            _unitOfWork.ViewedPosts.Add(viewedPost);
            _unitOfWork.Save();
            return StatusCode(200);
        }
    }
}