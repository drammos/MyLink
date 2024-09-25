using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyLink.Models
{
    public class Message
    {
        public int Id { get; set; }

        [Required]
        public string? MessageBody { get; set; }

        [Required]
        [ForeignKey("UserId")]
        public string? UserId { get; set; }
        public User User { get; set; }

        [Required]
        public string? SenderUsername { get; set; }
        
        [Required]
        public DateTime DateCreated { get; set; }
    }
}