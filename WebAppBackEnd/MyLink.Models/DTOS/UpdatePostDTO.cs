using System.ComponentModel.DataAnnotations;

namespace MyLink.Models.DTOS
{
    public class UpdatePostDTO
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string? Title { get; set; }
        [Required]
        public string? Content { get; set; }
        [Required]
        public DateTime UpdateAt { get; set; }
        public List<string> PictureUrls { get; set; } = [];
        public List<string> VideoUrls { get; set; } = [];
        [Required]
        public bool IsLikedByCurrentUser { get; set; }
    }
}
