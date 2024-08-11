using MyLink.Data.Repository.IRepository;
using MyLink.Data.Access;

namespace MyLink.Data.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        public ApplicationDbContext _context;

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
