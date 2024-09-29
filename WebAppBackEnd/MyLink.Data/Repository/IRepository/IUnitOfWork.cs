
namespace MyLink.Data.Repository.IRepository
{
    public interface IUnitOfWork
    {
        public IUserRepository User { get; set; }
        public IEducationRepository Education { get; set; }
        public IExperienceRepository Experience { get; set; }
        public IPostRepository Post { get; set; }
        public IJobRepository Job { get; set; }
        public IMessageRepository Message { get; set; }
        public IViewedPostsRepository ViewedPosts { get; }
        public ICommentRepository Comment { get; }
        public IReactionRepository Reaction { get; }
        public IViewedJobsRepository ViewedJobs { get; }
        void Save();
    }
}
