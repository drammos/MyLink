using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MyLink.Data.Repository.IRepository;
using MyLink.Models;
using MyLink.Models.DTOS;

namespace WebAppMyLink.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PostController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<User> _userManager;

        public PostController(IUnitOfWork unitOfWork, UserManager<User> userManager)
        {
            _unitOfWork = unitOfWork;
            _userManager = userManager;
        }

        [HttpPost("CreatePost")]
        public async Task<ActionResult<Post>> CreatePost([FromForm] CreatePostDTO createPostDTO)
        {
            User user = await _userManager.FindByIdAsync(createPostDTO.UserId);
            if (user == null) return NotFound();

            Post post = new Post
            {
                Title = createPostDTO.Title,
                Content = createPostDTO.Content,
                CreatedAt = createPostDTO.CreatedAt,
                PictureUrls = createPostDTO.PictureUrls,
                VideoUrls = createPostDTO.VideoUrls,
                LikesCount = 0,
                CommentsCount = 0,
                IsLikedByCurrentUser = false,
                UserId = createPostDTO.UserId
            };

            _unitOfWork.Save();
            return post;
        }

        [HttpGet("GetPost")]
        public async Task<ActionResult<List<Post>>> GetPosts(string UserId)
        {
            IEnumerable<Post> list = _unitOfWork.Post.GetAll();

            List<Post> posts = new List<Post>();
            foreach (Post pos in list)
            {
                if (UserId.Equals(pos.UserId))
                    posts.Add(pos);
            }
            return posts;
        }

        [HttpPut("EditPost")]
        public async Task<ActionResult<Post>> EditPost([FromForm] UpdatePostDTO updatePostDTO)
        {
            Post post = _unitOfWork.Post.Update(updatePostDTO);
            if (post == null)
                return NotFound();

            _unitOfWork.Save();
            return post;
        }

        [HttpDelete("DeletePost")]
        public async Task<ActionResult> DeletePost(int postId)
        {
            var post = _unitOfWork.Post.FirstOrDefault(u => u.Id == postId);
            if (post == null)
                return NotFound();

            _unitOfWork.Post.Delete(post);
            _unitOfWork.Save();
            return StatusCode(200);
        }

        [HttpPost("AddComment")]
        public async Task<ActionResult<Comment>> CreateComment([FromForm] CreateCommentDTO createCommentDTO)
        {
            User user = await _userManager.FindByNameAsync(createCommentDTO.Username);
            if (user == null) return NotFound();

            Comment comment = new Comment()
            {
                Content = createCommentDTO.Content,
                CreatedAt = createCommentDTO.CreatedAt,
                Username = createCommentDTO.Username,
                PostId = createCommentDTO.PostId
            };

            bool result = _unitOfWork.Post.AddComment(comment);
            if (!result)
                return NotFound();

            _unitOfWork.Save();
            return comment;
        }
    }
}
