using System.ComponentModel.DataAnnotations;

namespace MyLink.Models
{
    public class Message
    {
        public int Id { get; set; }

        [Required]
        public string? MessageBody { get; set; }

        [Required]
        public string? UserId { get; set; }
        public User User { get; set; } = null!;

        [Required]
        public string? SenderUsername { get; set; }
    }
}