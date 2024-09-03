
namespace MyLink.Data.Repository.IRepository
{
    public interface IUnitOfWork
    {
        public IUserRepository User { get; set; }
        public IEducationRepository Education { get; set; }
        public IExperienceRepository Experience { get; set; }
        public IPostRepository Post { get; set; }
        void Save();
    }
}
