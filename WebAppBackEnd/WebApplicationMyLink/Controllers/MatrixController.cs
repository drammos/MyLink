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
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using MyLink.Services.Pagination;
using MyLink.Models.Pagination;
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
        [Authorize]
        public async Task<ActionResult<List<PostUserDTO>>> GetProposedPosts([FromQuery] string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound();

            var posts = await _matrixFactorizationAlgorithm.GetProposedPosts(user.Id);
            
            // If the algrotihm havn't compute the results
            if (posts == null || posts.Count == 0)
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
            List<PostUserDTO> proposedPosts = await _unitOfWork.Post.GetPreposedPosts(posts, user);

            return proposedPosts;
        }

        [HttpGet("GetProposedJobs")]
        [Authorize]
        public async Task<ActionResult<PagedList<JobDTO>>> GetProposedJobs([FromQuery] string userId, [FromQuery] Params PaginationParams)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound();

            var jobs = await _matrixFactorizationAlgorithm.GetProposedJobs(user.Id);
            var jobsQ = jobs.AsQueryable();
            // If the algrotihm havn't compute the results
            if (jobs == null || !jobs.Any())
            {
                var oldJobs = _unitOfWork.Job.GetSortingJobs(new FilterJobsDTO(){UserId = userId, PageSize = PaginationParams.PageSize, PageNumber = PaginationParams.PageNumber});
                var jobsListPaged = await PagedList<Job>.ToPagedList(oldJobs, PaginationParams.PageNumber, PaginationParams.PageSize);
                List<JobDTO> jobDTOList = new List<JobDTO>();
                foreach (var job in jobsListPaged)
                {
                    JobDTO jobDTO = _mapper.Map<JobDTO>(job);
                    jobDTOList.Add(jobDTO);
                }
                var jobDTOPaginationList = new PagedList<JobDTO>(jobDTOList, jobsListPaged.Metadata.TotalCount, jobsListPaged.Metadata.CurrentPage, jobsListPaged.Metadata.PageSize);
                Response.AddPaginationHeader(jobDTOPaginationList.Metadata);
                return jobDTOPaginationList;
            }
            
            var jobsListPagedMatrix = PagedList<Job>.ToPagedListInMemory(jobsQ, PaginationParams.PageNumber, PaginationParams.PageSize);

            List<JobDTO> jobDTOListMatrix = new List<JobDTO>();
            foreach (var job in jobsListPagedMatrix)
            {
                JobDTO jobDTO = _mapper.Map<JobDTO>(job);
                if (job.User != null)
                {
                    jobDTO.FirstName = job.User.FirstName;
                    jobDTO.LastName = job.User.LastName;
                    jobDTO.PictureURL = job.User.PictureURL;
                    jobDTO.UserName = job.User.UserName;
                }
                jobDTOListMatrix.Add(jobDTO);
            }

            var jobDTOPaginationListMatrix = new PagedList<JobDTO>(jobDTOListMatrix,
                jobsListPagedMatrix.Metadata.TotalCount, jobsListPagedMatrix.Metadata.CurrentPage,
                jobsListPagedMatrix.Metadata.PageSize);
            Response.AddPaginationHeader(jobDTOPaginationListMatrix.Metadata);
            return jobDTOPaginationListMatrix;

        }
    }
}