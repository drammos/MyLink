using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MyLink.Models;
using MyLink.Models.DTOS;

namespace WebAppMyLink.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        public UsersController(UserManager<User> _userManager) 
        { 
            this._userManager = _userManager;
        }

        [HttpPost("loginUser")]
        public async Task<ActionResult<UserDTO>> LoginUser(LoginDTO loginDTO)
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
                IsAdmin = user.IsAdmin,
                Role = roles[0]
            };
        }

        [HttpPost("RegisterUser")]
        public async Task<ActionResult<UserDTO>> RegisterUser()
        {

        } 

        [HttpGet("GetAllUsers")]
        public IActionResult GetAllUsers()
        {
            var users = _userManager.Users.ToList();
            return Ok(users);
        }
    }
}
