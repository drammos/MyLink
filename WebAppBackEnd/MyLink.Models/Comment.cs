using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyLink.Models
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Content { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
        [Required]
        [ForeignKey("PostId")]
        public int PostId { get; set; }
        public Post Post { get; set; } = null!;
        [Required]
        public string Username { get; set; }
    }
}
