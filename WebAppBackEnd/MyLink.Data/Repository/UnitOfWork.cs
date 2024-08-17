using MyLink.Data.Repository.IRepository;
using MyLink.Data.Access;

namespace MyLink.Data.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private ApplicationDbContext _context;
        public IEducationRepository Education { get; set; }

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
            Education = new EducationRepository(context);
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
