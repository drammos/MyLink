using Microsoft.AspNetCore.Mvc;
using MyLink.Data.Repository.IRepository;
using MyLink.Models.DTOS;
using MyLink.Models;
using MyLink.Services.JsonWebTokens;
using Microsoft.AspNetCore.Identity;

namespace WebAppMyLink.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EducationController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly Token _token;

        public EducationController(IUnitOfWork unitOfWork, Token token)
        {
            _unitOfWork = unitOfWork;
            _token = token;
        }

        [HttpPost("AddEducation")]
        public async Task<ActionResult<Education>> AddEducation([FromForm] EducationDTO educationDTO)
        {
            Education education = new Education()
            {
                School = educationDTO.School,
                Degree = educationDTO.Degree,
                FieldOfStudy = educationDTO.FieldOfStudy,
                StartDate = educationDTO.StartDate,
                EndDate = educationDTO.EndDate,
                Grade = educationDTO.Grade,
                Description = educationDTO.Description,
                UserId = educationDTO.UserId,
                IsPublic = educationDTO.IsPublic
            };

            _unitOfWork.Education.Add(education);
            _unitOfWork.Save();

            return education;
        }

        [HttpGet("GetEducations")]
        public async Task<ActionResult<List<Education>>> GetEducations(string userId)
        {
            return await _unitOfWork.Education.GetUserEducations(userId);
        }
        
        [HttpGet("GetEducation")]
        public ActionResult<Education> GetEducation(int educationId)
        {
            Education education = _unitOfWork.Education
                .FirstOrDefault(e => e.Id == educationId);

            if (education == null) return NotFound();
            return education;
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
    }
}
