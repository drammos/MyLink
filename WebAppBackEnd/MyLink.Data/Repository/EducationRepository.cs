using MyLink.Data.Access;
using MyLink.Data.Repository.IRepository;
using MyLink.Models;

namespace MyLink.Data.Repository
{
    public class EducationRepository: RepositoryBase<Education>, IEducationRepository
    {
        public EducationRepository(ApplicationDbContext context) : base(context)
        {

        }
    }
}
