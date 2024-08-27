using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyLink.Models
{
    public class Post
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? Title { get; set; }
        [Required]
        public string? Content { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
        public DateTime UpdateAt { get; set; }
        public List<string> PictureUrls { get; set; } = [];
        public List<string> VideoUrls { get; set; } = [];
        public int LikesCount { get; set; }
        public int CommentsCount { get; set; }
        public ICollection<Comment> Comments { get; set; } = [];
        public ICollection<Reaction> Reactions { get; set; } = [];
        [Required]
        public bool IsLikedByCurrentUser { get; set; }

        [Required]
        [ForeignKey("UserId")]
        public string? UserId { get; set; }
        public User User { get; set; } = null!;
    }
}
