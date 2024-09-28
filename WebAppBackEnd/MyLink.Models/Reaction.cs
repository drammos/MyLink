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
        public DateTime CreatedAt { get; set; }
        [Required]
        [ForeignKey("PostId")]
        public int PostId { get; set; }
        public Post Post { get; set; } = null!;

        [Required]
        public string Username { get; set; }
    }
}
