using MyLink.Data.Access;
using MyLink.Data.Repository.IRepository;
using MyLink.Models;
using MyLink.Models.DTOS;

namespace MyLink.Data.Repository
{
    public class EducationRepository: RepositoryBase<Education>, IEducationRepository
    {
        private ApplicationDbContext _context;
        public EducationRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public Education Update(UpdateEducationDTO updateEducationDTO)
        {
            var id = updateEducationDTO.Id;
            var education = _context.Educations.FirstOrDefault(u => u.Id == id);
            if(education == null)
            {
                return null;
            }

            education.School = updateEducationDTO.School;
            education.Degree = updateEducationDTO.Degree;
            education.FieldOfStudy = updateEducationDTO.FieldOfStudy;
            education.StartDate = updateEducationDTO.StartDate;
            education.EndDate = updateEducationDTO.EndDate;
            education.Grade = updateEducationDTO.Grade;
            education.Description = updateEducationDTO.Description;
            return education;
        }
    }
}
