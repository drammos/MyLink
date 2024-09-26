using Microsoft.EntityFrameworkCore;
using MyLink.Data.Repository.IRepository;
using MyLink.Models;
using MyLink.Data.Access;
using MyLink.Models.DTOS;

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
                .OrderBy(message => message.DateCreated)
                .Include(message => message.User);
            
        }

        public List<ChatOutDTO> GetChats(User myUser)
        {
            var messages =  _context.Messages
                .Include(m => m.User) 
                .Where(m => m.SenderUsername == myUser.UserName|| m.User.UserName == myUser.UserName) // Ο χρήστης είναι είτε αποστολέας είτε παραλήπτης
                .GroupBy(m => m.SenderUsername == myUser.UserName ? m.User.UserName : m.SenderUsername) // Ομαδοποίηση με βάση τον συνομιλητή (username)
                .Select(g => g.OrderByDescending(m => m.DateCreated).First()) // Παίρνουμε το πιο πρόσφατο μήνυμα από κάθε συνομιλία
                // Φορτώνουμε τον παραλήπτη (τον συνομιλητή αν ο χρήστης είναι αποστολέας)
                .ToList();
            
            
            List<ChatOutDTO> chats = new List<ChatOutDTO>();
            foreach (var msg in messages)
            {
                if (msg.SenderUsername == myUser.UserName)
                {
                    ChatOutDTO dto = new ChatOutDTO()
                    {
                        InterlocutorFirstname = msg.User.FirstName,
                        InterlocutorLastname = msg.User.LastName,
                        InterlocutorUsername = msg.User.UserName,
                        InterlocutorPictureURL = msg.User.PictureURL,
                        LastMessage = msg.MessageBody,
                        InterlocutorUserId = msg.User.Id,
                    };
                    chats.Add(dto);
                }
                else
                {
                    User user = _context.Users.FirstOrDefault(u => u.UserName == msg.SenderUsername);
                    ChatOutDTO dto = new ChatOutDTO()
                    {
                        InterlocutorFirstname = user.FirstName,
                        InterlocutorLastname = user.LastName,
                        InterlocutorUsername = user.UserName,
                        InterlocutorPictureURL = user.PictureURL,
                        InterlocutorUserId = user.Id,
                        LastMessage = msg.MessageBody
                    };
                    chats.Add(dto);
                }
            }
            
            return chats;
        }
    }    
}
