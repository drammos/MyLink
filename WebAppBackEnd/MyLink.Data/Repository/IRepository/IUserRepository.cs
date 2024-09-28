using MyLink.Models;
using MyLink.Models.DTOS;

namespace MyLink.Data.Repository.IRepository
{
    public interface IUserRepository : IRepositoryBase<User>
    {
        public Task<List<User>> GetConnectedUsers(string Id);
        public Task<List<User>> GetInComingRequestUsers(string Id);
        public Task<List<User>> GetPendingRequestUsers(string Id);
        public Task<bool> DeleteRequest(string PendingUserId, string RecipientUserId);
        public IQueryable<User> SearchUsers(string SearchQuery);
        public Task<List<UserNotificationsDTO>> GetUsersNotificationsDtos(User user);
    }
}
