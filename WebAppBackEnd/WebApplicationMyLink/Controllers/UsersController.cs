using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MyLink.Models;
using MyLink.Models.DTOS;
using MyLink.Data.Repository.IRepository;

namespace WebAppMyLink.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IUnitOfWork _unitOfWork;

        public UsersController(UserManager<User> _userManager, IUnitOfWork unitOfWork)
        {
            this._userManager = _userManager;
            _unitOfWork = unitOfWork;
        }

        [HttpPost("loginUser")]
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
                Role = roles[0]
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

            if(!string.IsNullOrEmpty(updateUserDTO.NewPassword))
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

        [HttpGet("GetAllUsers")]
        public IActionResult GetAllUsers()
        {
            var users = _userManager.Users.ToList();
            return Ok(users);
        }
    }
}
