using MyLink.Data.Access;
using MyLink.Models.DTOS;
using MyLink.Models;
using MyLink.Data.Repository.IRepository;

namespace MyLink.Data.Repository
{
    public class ExperienceRepository : RepositoryBase<Experience>, IExperienceRepository
    {
        private ApplicationDbContext _context;
        public ExperienceRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public Experience Update(UpdateExperienceDTO updateExperienceDTO)
        {
            var id = updateExperienceDTO.Id;
            var experience = _context.Experiences.FirstOrDefault(u => u.Id == id);
            if (experience == null)
            {
                return null;
            }

            experience.Title = updateExperienceDTO.Title;
            experience.EmploymentType = updateExperienceDTO.EmploymentType;
            experience.CompanyName = updateExperienceDTO.CompanyName;
            experience.Location = updateExperienceDTO.Location;
            experience.LocationType = updateExperienceDTO.LocationType;
            experience.StartDate = updateExperienceDTO.StartDate;
            experience.EndDate = updateExperienceDTO.EndDate;
            experience.CurrentJob = updateExperienceDTO.CurrentJob;
            experience.Description = updateExperienceDTO.Description;
            return experience;
        }
    }
}
