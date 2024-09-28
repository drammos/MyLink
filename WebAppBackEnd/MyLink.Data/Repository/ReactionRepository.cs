using MyLink.Data.Access;
using MyLink.Models;
using MyLink.Data.Repository.IRepository;
namespace MyLink.Data.Repository;


public class ReactionRepository: RepositoryBase<Reaction>, IReactionRepository
{
    private ApplicationDbContext _context;
    
    public ReactionRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }
}