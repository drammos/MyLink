using System.ComponentModel.DataAnnotations;

namespace MyLink.Models.DTOS
{
    public class CreateCommentDTO
    {
        [Required]
        public string Content { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
        [Required]
        public int PostId { get; set; }
        [Required]
        public string Username { get; set; }
    }
}
