using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MyLink.Data.Repository.IRepository;
using MyLink.Services.MatrixFactorization;
using Microsoft.AspNetCore.Mvc;
using MyLink.Data.Repository.IRepository;
using MyLink.Models.DTOS;
using MyLink.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;

namespace WebAppMyLink.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class MatrixController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly MatrixFactorizationAlgorithm _matrixFactorizationAlgorithm;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        
        public MatrixController(UserManager<User> userManager, IUnitOfWork unitOfWork, MatrixFactorizationAlgorithm matrixFactorizationAlgorithm, IMapper mapper)
        {
            _userManager = userManager;
            _unitOfWork = unitOfWork;
            _matrixFactorizationAlgorithm = matrixFactorizationAlgorithm;
            _mapper = mapper;
        }
        
        [HttpGet("GetProposedPosts")]
        public async Task<ActionResult<List<PostUserDTO>>> GetProposedPosts([FromQuery] string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound();

            var posts = _matrixFactorizationAlgorithm.GetProposedPosts(user.Id);
            List<PostUserDTO> proposedPosts = new List<PostUserDTO>();
            
            
            // It's necessary to check for connected user or 
            
            // foreach (var post in proposedPosts)
            // {
            //     if (!post.IsMyPost && !post.IsFromConnectedUser)
            //     {
            //         User connectedUser = await _userManager.FindByNameAsync(post.ConnectedUserName);
            //         post.ConnectedFirstName = connectedUser.FirstName;
            //         post.ConnectedLastName = connectedUser.LastName;
            //         post.ConnectedUserId = connectedUser.Id;
            //         post.ConnectedPictureURL = connectedUser.PictureURL;
            //     }
            // }

            return proposedPosts;
        }
    }
}