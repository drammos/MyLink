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
        public async Task<ActionResult<UserDTO>> RegisterUser([FromForm] RegisterDTO registerDTO)
        {
            if(await _userManager.FindByNameAsync(registerDTO.Username) != null)
            {
                return ValidationProblem();
            }

            if(await _userManager.FindByEmailAsync(registerDTO.Email) != null)
            {
                return ValidationProblem();
            }

            User user = new User()
            {
                FirstName = registerDTO.FirstName,
                LastName = registerDTO.LastName,
                Email = registerDTO.Email,
                UserName = registerDTO.Username,
                IsAdmin = registerDTO.IsAdmin,
                PhoneNumber = registerDTO.PhoneNumber
            };
            var result = await _userManager.CreateAsync(user, registerDTO.Password);
            if(result.Succeeded == false)
            {
                foreach(var error in result.Errors)
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
                IsAdmin = user.IsAdmin,
                Role = registerDTO.Role
            };
        }

        [HttpGet("GetUser")]
        public async Task<ActionResult<UserDTO>> GetUser(string Username)
        {
            User user = await _userManager.FindByNameAsync(Username);
            if (user == null)
                return Unauthorized();

            var roles = await _userManager.GetRolesAsync(user);
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


        [HttpGet("GetAllUsers")]
        public IActionResult GetAllUsers()
        {
            var users = _userManager.Users.ToList();
            return Ok(users);
        }
    }
}
