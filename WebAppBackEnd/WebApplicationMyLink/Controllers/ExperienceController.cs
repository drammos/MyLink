using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MyLink.Data.Repository.IRepository;
using MyLink.Models;
using MyLink.Models.DTOS;
using MyLink.Services.JsonWebTokens;

namespace WebAppMyLink.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ExperienceController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly Token _token;

        public ExperienceController(IUnitOfWork unitOfWork, Token token)
        {
            _unitOfWork = unitOfWork;
            _token = token;
        }

        [HttpPost("AddExperience")]
        public async Task<ActionResult<Experience>> AddExperience([FromForm] ExperienceDTO experienceDTO)
        {
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
                UserId = experienceDTO.UserId,
                IsPublic = experienceDTO.IsPublic,
            };

            _unitOfWork.Experience.Add(experience);
            _unitOfWork.Save();

            return experience;
        }
        
        [HttpGet("GetExperiences")]
        public async Task<ActionResult<List<Experience>>> GetExperiences(string userId)
        {
            return await _unitOfWork.Experience.GetUserExperiences(userId);
        }

        [HttpGet("GetExperience")]
        public ActionResult<Experience> GetExperience(int experienceId)
        {
            Experience experience = _unitOfWork.Experience
                .FirstOrDefault(e => e.Id == experienceId);

            if (experience == null) return NotFound();
            return experience;
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
    }
}
