using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MyLink.Models;
using MyLink.Models.DTOS;
using MyLink.Data.Repository.IRepository;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using MyLink.Services.JsonWebTokens;
using System.Drawing;

namespace WebAppMyLink.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IUnitOfWork _unitOfWork;
        private readonly Token _token;

        public UserController(UserManager<User> userManager, IUnitOfWork unitOfWork, Token token)
        {
            _userManager = userManager;
            _unitOfWork = unitOfWork;
            _token = token;
        }

        [HttpPost("LoginUser")]
        public async Task<ActionResult<UserDTO>> LoginUser(LoginUserDTO loginDTO)
        {
            User user = await _userManager.FindByNameAsync(loginDTO.Username);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDTO.Password))
            {
                return Unauthorized();
            }
            var listfromroles = await _userManager.GetRolesAsync(user);
            List<string> roles = new List<string>(listfromroles);
            return new UserDTO
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Username = user.UserName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                PictureURL = user.PictureURL,
                Role = roles[0],
                CoverLetterURL = user.CoverLetterURL,
                WebPage = user.WebPage,
                Token = await _token.GenerateJSONWebToken(user)
            };
        }

        [HttpPost("RegisterUser")]
        public async Task<ActionResult<UserDTO>> RegisterUser([FromForm] RegisterUserDTO registerDTO)
        {
            User user = new User()
            {
                FirstName = registerDTO.FirstName,
                LastName = registerDTO.LastName,
                Email = registerDTO.Email,
                UserName = registerDTO.Username,
                PhoneNumber = registerDTO.PhoneNumber,
                PictureURL = registerDTO.PictureURL,
                Birthday = registerDTO.Birthday,
                CoverLetterURL = registerDTO.CoverLetterURL,
                WebPage = registerDTO.WebPage,
            };
            var result = await _userManager.CreateAsync(user, registerDTO.Password);
            if (result.Succeeded == false)
            {
                foreach (var error in result.Errors)
                {
                    var str = error.ToString();
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }


            result = await _userManager.AddToRoleAsync(user, registerDTO.Role);
            if (result.Succeeded == false)
            {
                foreach (var error in result.Errors)
                {
                    var str = error.ToString();
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            return new UserDTO
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Username = user.UserName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                PictureURL = user.PictureURL,
                Role = registerDTO.Role,
                Birthday = registerDTO.Birthday,
                CoverLetterURL = registerDTO.CoverLetterURL,
                WebPage = registerDTO.WebPage,
            };
        }

        [HttpGet("GetUser")]
        public async Task<ActionResult<User>> GetUser(string Username)
        {
            User user = await _userManager.FindByNameAsync(Username);
            if (user == null)
                return NotFound();

            return user;
        }

        [HttpGet("GetRoleForUser")]
        public async Task<ActionResult<string>> GetRoleForUser(string Username)
        {
            User user = await _userManager.FindByNameAsync(Username);
            if (user == null)
                return NotFound();

            var listfromroles = await _userManager.GetRolesAsync(user);
            List<string> roles = new List<string>(listfromroles);

            return roles[0];
        }

        [HttpPut("UpdateUser")]
        public async Task<ActionResult<UserDTO>> UpdateUser([FromForm] UpdateUserDTO updateUserDTO)
        {
            User user = await _userManager.FindByNameAsync(updateUserDTO.Username);
            if (user == null)
                return NotFound();

            user.FirstName = updateUserDTO.FirstName;
            user.LastName = updateUserDTO.LastName;
            user.PhoneNumber = updateUserDTO.PhoneNumber;
            user.Email = updateUserDTO.Email;
            user.PictureURL = updateUserDTO.PictureURL;
            user.CoverLetterURL = updateUserDTO.CoverLetterURL;
            user.WebPage = updateUserDTO.WebPage;

            if (!string.IsNullOrEmpty(updateUserDTO.NewPassword))
            {
                var result = await _userManager.ChangePasswordAsync(user, updateUserDTO.CurrentPassword, updateUserDTO.NewPassword);
                if (result.Succeeded == false)
                {
                    foreach (var error in result.Errors)
                    {
                        var str = error.ToString();
                        ModelState.AddModelError(error.Code, error.Description);
                    }

                    return ValidationProblem();
                }
            }

            var listfromroles = await _userManager.GetRolesAsync(user);
            List<string> roles = new List<string>(listfromroles);

            //Save the changes in DB
            _unitOfWork.Save();

            //Return the DTO
            return new UserDTO
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Username = user.UserName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                PictureURL = user.PictureURL,
                CoverLetterURL = user.CoverLetterURL,
                WebPage = user.WebPage,
                Role = roles[0]
            };
        }

        [HttpGet("IsConnectedUsers")]
        [Authorize(Roles = "Professional")]
        public async Task<ActionResult<bool>> IsConnectedUsers([FromQuery] string UserId1, [FromQuery] string UserId2)
        {
            List<User> list = await _unitOfWork.User.GetConnectedUsers(UserId1);
            if (list == null) return false;
            
            var user = list.FirstOrDefault(x => x.Id == UserId2);
            if(user == null) return false;

            return true;
        }

        [HttpGet("IsPendingRequest")]
        [Authorize(Roles = "Professional")]
        public async Task<ActionResult<bool>> IsPendingReqeuest([FromQuery] string PendingUserId, [FromQuery] string RecipientUserId)
        {
            var list = await _unitOfWork.User.GetPendingRequestUsers(PendingUserId);
            if (list == null) return false;

            var user = list.FirstOrDefault(x => x.Id == RecipientUserId);
            if (user == null) return false;

            return true;
        }

        [HttpGet("IsInComingRequest")]
        [Authorize(Roles = "Professional")]
        public async Task<ActionResult<bool>> IsInComingRequest([FromQuery] string PendingUserId, [FromQuery] string RecipientUserId)
        {
            var list = await _unitOfWork.User.GetInComingRequestUsers(RecipientUserId);
            if (list == null) return false;

            var user = list.FirstOrDefault(x => x.Id == PendingUserId);
            if (user == null) return false;

            return true;
        }

        [HttpPost("RequestToConnection")]
        [Authorize(Roles = "Professional")]
        public async Task<ActionResult> RequestToConnection([FromQuery] string SenderUserId, [FromQuery] string RecipientUserId)
        {
            User senderUser = await _userManager.FindByIdAsync(SenderUserId);
            User recipientUser = await _userManager.FindByIdAsync(RecipientUserId);

            if (senderUser == null || recipientUser == null)
                return NotFound();

            senderUser.PendingRequestUsers.Add(recipientUser);
            recipientUser.InComingRequestUsers.Add(senderUser);

            _unitOfWork.Save();
            return StatusCode(200);
        }

        [HttpPost("AcceptRequest")]
        [Authorize(Roles = "Professional")]
        public async Task<ActionResult> AcceptRequest([FromQuery] string PendingUserId, [FromQuery] string RecipientUserId)
        {
            var user = await _userManager.FindByIdAsync(RecipientUserId);
            var userNewConnection = await _userManager.FindByIdAsync(PendingUserId);
            if (user == null || userNewConnection == null)
                return NotFound();

            user.ConnectedUsers.Add(userNewConnection);
            userNewConnection.ConnectedUsers.Add(user);

            bool result = await _unitOfWork.User.DeleteRequest(PendingUserId, RecipientUserId);
            if (!result)
                return NotFound();

            _unitOfWork.Save();
            return StatusCode(200);
        }

        [HttpDelete("DeleteRequest")]
        [Authorize(Roles = "Professional")]
        public async Task<ActionResult> DeleteRequest([FromQuery] string PendingUserId, [FromQuery] string RecipientUserId)
        {
            bool result = await _unitOfWork.User.DeleteRequest(PendingUserId, RecipientUserId);
            if (!result)
                return NotFound();
                
            _unitOfWork.Save();
            return StatusCode(200);
        }

        [HttpGet("GetListFromConnections")]
        [Authorize(Roles = "Professional")]
        public async Task<ActionResult<List<User>>> GetListFromConnections([FromQuery] string UserId)
        {
            return await _unitOfWork.User.GetConnectedUsers(UserId);
        }

        [HttpGet("GetListFromInComingRequests")]
        [Authorize(Roles = "Professional")]
        public async Task<ActionResult<List<User>>> GetListFromInComingRequests([FromQuery] string UserId)
        {
            return await _unitOfWork.User.GetInComingRequestUsers(UserId);
        }

        [HttpGet("GetListFromPendingRequests")]
        [Authorize(Roles = "Professional")]
        public async Task<ActionResult<List<User>>> GetListFromPendingRequests([FromQuery] string UserId)
        {
            return await _unitOfWork.User.GetPendingRequestUsers(UserId);
        }

        [HttpGet("GetAllUsers")]
        [Authorize(Roles = "Admin")]
        public List<User> GetAllUsers()
        {
            var users = _userManager.Users.ToList();
            return users;
        }

        [HttpDelete("DeleteUser")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser(string Username)
        {
            User user = await _userManager.FindByNameAsync(Username);
            if (user == null)
                return NotFound();

            await _userManager.DeleteAsync(user);
            return StatusCode(200);
        }
    }
}
