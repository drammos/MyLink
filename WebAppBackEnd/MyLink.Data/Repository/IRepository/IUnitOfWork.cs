
namespace MyLink.Data.Repository.IRepository
{
    public interface IUnitOfWork
    {
        public IEducationRepository Education { get; set; }
        void Save();
    }
}
