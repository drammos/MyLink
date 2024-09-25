using System.ComponentModel.DataAnnotations;

namespace MyLink.Models.DTOS
{
    public class CreateMessageDTO
    {
        [Required]
        public string? MessageBody { get; set; }
        [Required]
        public string? SenderUsername { get; set; }
        [Required]
        public string? RecipientUsername { get; set; }
    }
}
