using System.ComponentModel.DataAnnotations;

namespace MyLink.Models.DTOS
{
    public class CreatePostDTO
    {
        [Required]
        public string? UserId { get; set; }
        [Required]
        public string? Title { get; set; }
        [Required]
        public string? Content { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
        public List<string> PictureUrls { get; set; } = [];
        public List<string> VideoUrls { get; set; } = [];
        public List<string> VoiceUrls { get; set; } = [];
        [Required]
        public bool IsPublic { get; set; }
    }
}
