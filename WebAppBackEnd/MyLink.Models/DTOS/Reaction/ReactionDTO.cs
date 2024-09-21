namespace MyLink.Models.DTOS
{
    public class ReactionDTO
    {
        public int Id { get; set; }
        public string ReactionType { get; set; }
        public int PostId { get; set; }
        // User
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string PictureURL { get; set; }
    }    
}
