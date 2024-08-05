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

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            User user = await _userManager.FindByNameAsync(loginDTO.Username);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDTO.Password))
            {
                return Unauthorized();
            }
            //var roles = await _userManager.GetRolesAsync(user);
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
            };
        }

        [HttpPost("GetAllUsers")]
        public IActionResult GetAllUsers()
        {
            var users = _userManager.Users.ToList();
            return Ok(users);
        }
    }
}
