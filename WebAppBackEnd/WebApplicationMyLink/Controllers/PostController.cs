using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MyLink.Data.Repository.IRepository;
using MyLink.Models;
using MyLink.Models.DTOS;
using AutoMapper;
using AutoMapper.Configuration.Annotations;

namespace WebAppMyLink.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        
        public PostController(IUnitOfWork unitOfWork, UserManager<User> userManager, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _mapper = mapper;
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
                VoiceUrls = createPostDTO.VoiceUrls,
                ReactionsCount = 0,
                CommentsCount = 0,
                IsLikedByCurrentUser = false,
                UserId = createPostDTO.UserId,
                IsPublic = createPostDTO.IsPublic,
            };

            _unitOfWork.Post.Add(post);
            _unitOfWork.Save();
            return post;
        }

        [HttpGet("GetUserPosts")]
        public async Task<ActionResult<List<Post>>> GetUserPosts(string UserId)
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

            await _unitOfWork.Post.DeleteAllCommentsFromPost(postId);
            await _unitOfWork.Post.DeleteAllReactionsFromPost(postId);
            _unitOfWork.Post.Delete(post);
          
            _unitOfWork.Save();
            return StatusCode(200);
        }

        [HttpPost("CreateComment")]
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

        [HttpGet("GetPostComments")]
        public async Task<ActionResult<List<CommentDTO>>> GetPostComments(int postId)
        {
            var comments = await _unitOfWork.Post.GetComments(postId);
            List<CommentDTO> commentDTOs = new List<CommentDTO>();
            foreach (var comment in comments)
            {
                User user = await _userManager.FindByNameAsync(comment.Username);
                if(user == null) continue;
                CommentDTO commentDTO = new CommentDTO()
                {
                    Id = comment.Id,
                    Content = comment.Content,
                    CreatedAt = comment.CreatedAt,
                    PostId = comment.PostId,
                    Username = comment.Username,
                    UserId = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    PictureURL = user.PictureURL,
                };
                commentDTOs.Add(commentDTO);
            }

            return commentDTOs;
        }

        [HttpGet("GetUserComments")]
        public async Task<ActionResult<List<Comment>>> GetUserComments(string userId)
        {
            User user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound();

            return await _unitOfWork.Post.GetUserComments(user.UserName);
        }

        [HttpDelete("DeleteAllCommentsFromPost")]
        public async Task<ActionResult> DeleteAllCommentsFromPost(int postId)
        {
            var post = _unitOfWork.Post.FirstOrDefault(u => u.Id == postId);
            if (post == null)
                return NotFound();

            await _unitOfWork.Post.DeleteAllCommentsFromPost(postId);

            _unitOfWork.Save();
            return StatusCode(200);
        }

        [HttpDelete("DeleteComment")]
        public async Task<ActionResult> DeleteComment([FromQuery] int commentId)
        {
            bool result = await _unitOfWork.Post.DeleteComment(commentId);
            if (!result)
                return NotFound();
 
            _unitOfWork.Save();
            return StatusCode(200);
        }

        [HttpPost("CreateReaction")]
        public async Task<ActionResult<Reaction>> CreateReaction([FromForm] CreateReactionDTO createReactionDTO)
        {
            User user = await _userManager.FindByNameAsync(createReactionDTO.Username);
            if (user == null) return NotFound();

            Reaction reaction = new Reaction()
            {
                ReactionType = createReactionDTO.ReactionType,
                Username = createReactionDTO.Username,
                PostId = createReactionDTO.PostId
            };

            bool result = _unitOfWork.Post.AddReaction(reaction);
            if (!result)
                return NotFound();

            _unitOfWork.Save();
            return reaction;
        }

        [HttpGet("GetPostReactions")]
        public async Task<ActionResult<List<ReactionDTO>>> GetPostReactions(int postId)
        {
            var reactions = await _unitOfWork.Post.GetReactions(postId);
            
            List<ReactionDTO> reactionDtos = new List<ReactionDTO>();
            foreach (var reaction in reactions)
            {
                User user = await _userManager.FindByNameAsync(reaction.Username);
                if(user == null) continue;
                ReactionDTO reactionDtoDTO = new ReactionDTO()
                {
                    Id = reaction.Id,
                    ReactionType = reaction.ReactionType,
                    PostId = reaction.PostId,
                    Username = reaction.Username,
                    UserId = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    PictureURL = user.PictureURL,
                };
                reactionDtos.Add(reactionDtoDTO);
            }

            return reactionDtos;
        }

        [HttpGet("GetUserReactions")]
        public async Task<ActionResult<List<Reaction>>> GetUserReactions(string userId)
        {
            User user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound();

            return await _unitOfWork.Post.GetUserReactions(user.UserName);
        }

        [HttpDelete("DeleteAllReactionsFromPost")]
        public async Task<ActionResult> DeleteAllReactionsFromPost(int postId)
        {
            var post = _unitOfWork.Post.FirstOrDefault(u => u.Id == postId);
            if (post == null)
                return NotFound();

            await _unitOfWork.Post.DeleteAllReactionsFromPost(postId);

            _unitOfWork.Save();
            return StatusCode(200);
        }

        [HttpDelete("DeleteReaction")]
        public async Task<ActionResult> DeleteReaction([FromQuery] int reactionId)
        {
            bool result = await _unitOfWork.Post.DeleteReaction(reactionId);
            if (!result)
                return NotFound();

            _unitOfWork.Save();
            return StatusCode(200);
        }

        [HttpGet("GetPostsFromConnectedUsers")]
        public async Task<ActionResult<List<PostDTO>>> GetPostsFromConnectedUsers([FromQuery] string userId)
        {
            var connectedUsers = await _unitOfWork.User.GetConnectedUsers(userId);
            List<string> userIdList = new List<string>();
            foreach (User user in connectedUsers)
            {
                userIdList.Add(user.Id);
            }
            userIdList.Add(userId);
            
            if (userIdList.Count == 0)
                return new List<PostDTO>();
            
            var posts = await _unitOfWork.Post.GetPostsFromConnectedUsers(userIdList);
            return _mapper.Map<List<PostDTO>>(posts);
        }
    }
}