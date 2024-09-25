using MyLink.Models;
using MyLink.Models.DTOS;

namespace MyLink.Data.Repository.IRepository
{
    public interface IMessageRepository: IRepositoryBase<Message>
    {
        public Message GetMessageById(int id);
        public IQueryable<Message> GetDiscussion(User myUser,User interactedUser);
        public List<ChatOutDTO> GetChats(User myUser);
    }
}