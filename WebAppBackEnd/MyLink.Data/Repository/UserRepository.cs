using Microsoft.EntityFrameworkCore;
using MyLink.Data.Access;
using MyLink.Data.Repository.IRepository;
using MyLink.Models;

namespace MyLink.Data.Repository
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        private ApplicationDbContext _context;
        public UserRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<User>> GetConnectedUsers(string Id)
        {
            var user = await _context.Users
                .Include(x => x.ConnectedUsers)
                .FirstOrDefaultAsync(x => x.Id == Id);

            if (user == null) return null;
            return [.. user!.ConnectedUsers];
        }

        public async Task<List<User>> GetInComingRequestUsers(string Id)
        {
            var user = await _context.Users
                .Include(x => x.InComingRequestUsers)
                .FirstOrDefaultAsync(x => x.Id == Id);

            if (user == null) return null;
            return [.. user!.InComingRequestUsers];
        }

        public async Task<List<User>> GetPendingRequestUsers(string Id)
        {
            var user = await _context.Users
                .Include(x => x.PendingRequestUsers)
                .FirstOrDefaultAsync(x => x.Id == Id);

            if (user == null) return null;
            return [.. user!.PendingRequestUsers];
        }

        public async Task<bool> DeleteRequest(string PendingUserId, string RecipientUserId)
        {

            //Remove from PendingRequestUsers
            var user = await _context.Users
                .Include(x => x.PendingRequestUsers)
                .FirstOrDefaultAsync(x => x.Id == PendingUserId);

            if (user == null) return false;
            var pendingUserToRemove = user.PendingRequestUsers
                .FirstOrDefault(x => x.Id == RecipientUserId);

            if (pendingUserToRemove == null) return false;
            user.PendingRequestUsers.Remove(pendingUserToRemove);

            //Remove from InComingRequests
            var user2 = await _context.Users
                .Include(x => x.InComingRequestUsers)
                .FirstOrDefaultAsync(x => x.Id == RecipientUserId);

            if (user2 == null) return false;
            var recipientUserToRemove = user2.InComingRequestUsers
                .FirstOrDefault(x => x.Id == PendingUserId);

            if (recipientUserToRemove == null) return false;
            user2.InComingRequestUsers.Remove(recipientUserToRemove);

            return true;
        }

        public IQueryable<User> SearchUsers(string SearchQuery)
        {
            var users =  _context.Users
                .Where(
                    u => u.UserName.StartsWith(SearchQuery) ||
                         (u.FirstName + " " + u.LastName).StartsWith(SearchQuery))
                ;

            return users;
        }
    }
}
