namespace MyLink.Models.DTOS
{
    public class UserNotificationsDTO
    {
        public string? UserId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? UserName { get; set; }
        public string? PictureURL { get; set; }
        public bool IsComment { get; set; }
        public int PostId { get; set; }
        public string? Body { get; set; }
    }
}