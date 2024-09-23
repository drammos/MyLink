namespace MyLink.Models.DTOS
{
    public class PostUserDTO
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdateAt { get; set; }
        public List<string> PictureUrls { get; set; }
        public List<string> VideoUrls { get; set; }
        public List<string> VoiceUrls { get; set; }
        public int ReactionsCount { get; set; }
        public int CommentsCount { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public ICollection<Reaction> Reactions { get; set; }
        public bool IsLikedByCurrentUser { get; set; }
        public bool IsPublic { get; set; }

        // User Where do the post details
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string PictureURL { get; set; }
        
        
        public bool IsMyPost { get; set; }
        // New properties for connected user interactions
        public bool IsFromConnectedUser { get; set; }
        public bool HasConnectedUserComment { get; set; }
        public bool HasConnectedUserReaction { get; set; }
        public string ConnectedUserId { get; set; }
        public string ConnectedFirstName { get; set; }
        public string ConnectedLastName { get; set; }
        public string ConnectedUserName { get; set; }
        public string ConnectedPictureURL { get; set; }
    }
}