using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MyLink.Models;
using MyLink.Models.DTOS;
using MyLink.Data.Repository.IRepository;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using MyLink.Services.JsonWebTokens;

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
                PictureURL = registerDTO.PictureURL
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
                Role = registerDTO.Role
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
                Role = roles[0]
            };
        }

        //Αν ειναι συνδεδεμενοι 2 χρηστες
        [HttpGet("IsConnectedUsers")]
        //[Authorize(Roles = "Professional")]
        public async Task<ActionResult<bool>> IsConnectedUsers([FromQuery] string UserId1, [FromQuery] string UserId2)
        {
            User user = await _userManager.FindByIdAsync(UserId1);
            if (user == null)
                return NotFound();

            foreach(User connectedUser in user.ConnectedUsers)
            {
                string id = connectedUser.Id;
                if (id.Equals(UserId2))
                    return true;
            }
            return false;
        }

        [HttpGet("IsPendingRequest")]
        //[Authorize(Roles = "Professional")]
        public async Task<ActionResult<bool>> IsPendingReqeuest([FromQuery] string PendingUserId, [FromQuery] string RecipientUserId)
        {
            User PendingUser = await _userManager.FindByIdAsync(PendingUserId);
            if (PendingUser == null)
                return NotFound();

            foreach (User user in PendingUser.PendingUserRequests)
            {
                string id = user.Id;
                if (id.Equals(RecipientUserId))
                    return true;
            }
            return false;
        }

        [HttpGet("IsComingRequest")]
        //[Authorize(Roles = "Professional")]
        public async Task<ActionResult<bool>> IsComingRequest([FromQuery] string UserId, [FromQuery] string PendingUserId)
        {
            User user = await _userManager.FindByIdAsync(UserId);
            if (user == null)
                return NotFound();

            foreach(User usr in user.InComingUserRequests)
            {
                string id = usr.Id;
                if (id.Equals(PendingUserId))
                    return true;
            }
            return false;
        }

        //Request For connection from SenderUserId.
        //If Users isn't Connected, you can do this Request
        [HttpPost("RequestToConnection")]
        //[Authorize(Roles = "Professional")]
        public async Task<ActionResult> RequestToConnection([FromQuery] string SenderUserId, [FromQuery] string RecipientUserId)
        {
            User SenderUser = await _userManager.FindByIdAsync(SenderUserId);
            User RecipientUser = await _userManager.FindByIdAsync(RecipientUserId);

            if (SenderUser == null || RecipientUser == null)
                return NotFound();

            SenderUser.PendingUserRequests.Add(RecipientUser);
            RecipientUser.InComingUserRequests.Add(SenderUser);

            return StatusCode(200);
        }

        [HttpPost("AcceptRequest")]
        public async Task<ActionResult> AcceptRequest([FromQuery] string RecipientUserId, [FromQuery] string PendingUserId)
        {
            User RecipientUser = await _userManager.FindByIdAsync(RecipientUserId);
            if (RecipientUser == null)
                return NotFound();

            foreach (User PendingUser in RecipientUser.InComingUserRequests)
            {
                string id = PendingUser.Id;
                if (id.Equals(PendingUserId))
                {
                    RecipientUser.InComingUserRequests.Remove(PendingUser);
                    PendingUser.PendingUserRequests.Remove(RecipientUser);
                    RecipientUser.ConnectedUsers.Add(PendingUser);
                    PendingUser.ConnectedUsers.Add(RecipientUser);
                    break;
                }
            }
            return StatusCode(200);
        }

        [HttpDelete("DeleteRequest")]
        public async Task<ActionResult> DeleteRequest([FromQuery] string PendingUserId, [FromQuery] string RecipientUserId)
        {
            User PendingUser = await _userManager.FindByIdAsync(PendingUserId);
            if (PendingUser == null)
                return NotFound();

            foreach (User RecipientUser in PendingUser.PendingUserRequests)
            {
                string id = RecipientUser.Id;
                if (id.Equals(RecipientUserId))
                {
                    PendingUser.PendingUserRequests.Remove(RecipientUser);
                    RecipientUser.InComingUserRequests.Remove(PendingUser);
                    break;
                }
            }
            return StatusCode(200);
        }

        [HttpGet("GetListFromConnections")]
        public async Task<ActionResult<List<User>>> GetListFromConnections([FromQuery] string UserId)
        {
            User user = await _userManager.FindByIdAsync(UserId);
            if (user == null)
                return NotFound();

            
            return user.ConnectedUsers.ToList<User>();
        }

        [HttpGet("GetListFromInComingRequests")]
        public async Task<ActionResult<List<User>>> GetListFromInComingRequests([FromQuery] string UserId)
        {
            User user = await _userManager.FindByIdAsync(UserId);
            if (user == null)
                return NotFound();


            return user.InComingUserRequests.ToList<User>();
        }

        [HttpGet("GetListFromPendingRequests")]
        public async Task<ActionResult<List<User>>> GetListFromPendingRequests([FromQuery] string UserId)
        {
            User user = await _userManager.FindByIdAsync(UserId);
            if (user == null)
                return NotFound();


            return user.PendingUserRequests.ToList<User>();
        }

        [HttpGet("GetAllUsers")]
        [Authorize(Roles = "Admin")]
        public List<User> GetAllUsers()
        {
            var users = _userManager.Users.ToList();
            return users;
        }

        [HttpPost("DeleteUser")]
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
