using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyLink.Models{
        public class ViewedPosts
        {
                [Required]
                public int Id { get; set; }

                [Required]
                public string? Username { get; set; }

                [Required]
                public int PostId { get; set; }
                [ForeignKey("PostId")]
                public Post Post { get; set; } = null!;
        }
}