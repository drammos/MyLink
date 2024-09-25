using Microsoft.EntityFrameworkCore;
using MyLink.Data.Repository.IRepository;
using MyLink.Models;
using MyLink.Data.Access;

namespace MyLink.Data.Repository
{
    public class MessageRepository: RepositoryBase<Message>, IMessageRepository
    {
        private ApplicationDbContext _context;

        public MessageRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public Message GetMessageById(int id)
        {
            return _context.Messages
                    .Include(u => u.User)
                    .FirstOrDefault(m => m.Id == id);
        }

        public IQueryable<Message> GetDiscussion(User myUser, User interactedUser)
        {
            return _context.Messages
                .Where(
                    message => 
                        (message.SenderUsername == myUser.UserName && message.UserId == interactedUser.Id) ||
                        (message.SenderUsername == interactedUser.UserName && message.UserId == myUser.Id)
                    )
                .OrderByDescending(message => message.DateCreated)
                .Include(message => message.User);
            
        }
    }    
}
