using System.ComponentModel.DataAnnotations;

namespace MyLink.Models.DTOS
{
    public class CreateReactionDTO
    {
        [Required]
        public string ReactionType { get; set; }
        [Required]
        public int PostId { get; set; }
        [Required]
        public string Username { get; set; }
    }
}