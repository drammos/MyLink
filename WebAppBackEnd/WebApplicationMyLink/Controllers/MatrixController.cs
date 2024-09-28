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

            var posts = await _matrixFactorizationAlgorithm.GetProposedPosts(user.Id);
            List<PostUserDTO> proposedPosts = new List<PostUserDTO>();
            
            
            // If the algrotihm havn't compute the results
            if (proposedPosts == null || proposedPosts.Count == 0)
            {
                var postsDTO = await _unitOfWork.Post.GetPostsFromOtherUsers(user);
                foreach (var post in postsDTO)
                {
                    if (!post.IsMyPost && !post.IsFromConnectedUser)
                    {
                        User connectedUser = await _userManager.FindByNameAsync(post.ConnectedUserName);
                        post.ConnectedFirstName = connectedUser.FirstName;
                        post.ConnectedLastName = connectedUser.LastName;
                        post.ConnectedUserId = connectedUser.Id;
                        post.ConnectedPictureURL = connectedUser.PictureURL;
                    }
                }

                return postsDTO;
            }
            
            
            // Let's start to seperated the post for this user
            

            return proposedPosts;
        }
    }
}