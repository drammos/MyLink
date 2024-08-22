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
    public class UsersController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IUnitOfWork _unitOfWork;
        private readonly Token _token;

        public UsersController(UserManager<User> userManager, IUnitOfWork unitOfWork, Token token)
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

        [HttpGet("GetAllUsers")]
        [Authorize(Roles = "Admin")]
        public List<User> GetAllUsers()
        {
            var users = _userManager.Users.ToList();
            return users;
        }

        [HttpPost("AddEducation")]
        public async Task<ActionResult<Education>> AddEducation([FromForm] EducationDTO educationDTO)
        {
            User user = await _userManager.FindByNameAsync(educationDTO.Username);
            if (user == null)
            {
                return NotFound();
            }

            Education education = new Education()
            {
                School = educationDTO.School,
                Degree = educationDTO.Degree,
                FieldOfStudy = educationDTO.FieldOfStudy,
                StartDate = educationDTO.StartDate,
                EndDate = educationDTO.EndDate,
                Grade = educationDTO.Grade,
                Description = educationDTO.Description,
                UserId = user.Id,
            };

            _unitOfWork.Education.Add(education);
            _unitOfWork.Save();

            return education;
        }

        [HttpGet("GetEducations")]
        public async Task<ActionResult<List<Education>>> GetUserEducations(string Username)
        {
            User user = await _userManager.FindByNameAsync(Username);
            if (user == null)
            {
                return NotFound();
            }

            IEnumerable<Education> list = _unitOfWork.Education.GetAll();

            List<Education> educations = new List<Education>();
            foreach (Education ed in list)
            {
                if (Username.Equals(ed.User.UserName))
                    educations.Add(ed);
            }
            return educations;
        }

        [HttpPut("EditEducation")]
        public ActionResult<Education> EditEducation([FromForm] UpdateEducationDTO educationDTO)
        {
            Education education = _unitOfWork.Education.Update(educationDTO);
            if (education == null)
                return NotFound();

            _unitOfWork.Save();
            return education;
        }

        [HttpDelete("DeleteEducation")]
        public ActionResult DeleteEducation(string Id)
        {
            int id = int.Parse(Id);

            var education = _unitOfWork.Education.FirstOrDefault(u => u.Id == id);
            if (education == null)
                return NotFound();

            _unitOfWork.Education.Delete(education);
            _unitOfWork.Save();
            return StatusCode(200);
        }

        [HttpPost("AddExperience")]
        public async Task<ActionResult<Experience>> AddExperience([FromForm] ExperienceDTO experienceDTO)
        {
            User user = await _userManager.FindByNameAsync(experienceDTO.Username);
            if (user == null)
            {
                return NotFound();
            }

            Experience experience = new Experience()
            {
                Title = experienceDTO.Title,
                EmploymentType = experienceDTO.EmploymentType,
                CompanyName = experienceDTO.CompanyName,
                Location = experienceDTO.Location,
                LocationType = experienceDTO.LocationType,
                StartDate = experienceDTO.StartDate,
                EndDate = experienceDTO.EndDate,
                CurrentJob = experienceDTO.CurrentJob,
                Description = experienceDTO.Description,
                UserId = user.Id,
            };

            _unitOfWork.Experience.Add(experience);
            _unitOfWork.Save();

            return experience;
        }

        [HttpGet("GetExperiences")]
        public async Task<ActionResult<List<Experience>>> GetExperiences(string Username)
        {
            User user = await _userManager.FindByNameAsync(Username);
            if (user == null)
            {
                return NotFound();
            }

            IEnumerable<Experience> list = _unitOfWork.Experience.GetAll();

            List<Experience> experiences = new List<Experience>();
            foreach (Experience ex in list)
            {
                if (Username.Equals(ex.User.UserName))
                    experiences.Add(ex);
            }
            return experiences;
        }

        [HttpPut("EditExperience")]
        public ActionResult<Experience> EditExperience([FromForm] UpdateExperienceDTO updateExperienceDTO)
        {
            Experience experience = _unitOfWork.Experience.Update(updateExperienceDTO);
            if (experience == null)
                return NotFound();

            _unitOfWork.Save();
            return experience;
        }

        [HttpDelete("DeleteExperience")]
        public ActionResult DeleteExperience(string Id)
        {
            int id = int.Parse(Id);

            var experience = _unitOfWork.Experience.FirstOrDefault(u => u.Id == id);
            if (experience == null)
                return NotFound();

            _unitOfWork.Experience.Delete(experience);
            _unitOfWork.Save();
            return StatusCode(200);
        }

        [HttpPost("Authentication")]
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
