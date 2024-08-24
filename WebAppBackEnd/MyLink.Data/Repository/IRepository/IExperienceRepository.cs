using MyLink.Models;
using MyLink.Models.DTOS;

namespace MyLink.Data.Repository.IRepository
{
    public interface IExperienceRepository : IRepositoryBase<Experience>
    {
        public Experience Update(UpdateExperienceDTO updateExperienceDTO);
    }
}
