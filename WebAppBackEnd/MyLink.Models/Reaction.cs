using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyLink.Models
{
    public class Reaction
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string ReactionType { get; set; }

        [Required]
        [ForeignKey("PostId")]
        public int PostId { get; set; }
        public Post Post { get; set; } = null!;

        [Required]
        [ForeignKey("UserId")]
        public string? UserId { get; set; } 
        public User User { get; set; } = null!;
    }
}
