using System.ComponentModel.DataAnnotations;

namespace MyLink.Models.DTOS
{
        public class LoginUserDTO
        {
            [Required]
            public string? Username { get; set; }
            [Required]
            public string? Password { get; set; }
        }
}
