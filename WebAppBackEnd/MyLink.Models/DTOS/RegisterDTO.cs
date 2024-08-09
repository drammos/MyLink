using System.ComponentModel.DataAnnotations;

namespace MyLink.Models.DTOS
{
    public class RegisterDTO: LoginDTO
    {
        [Required]
        public string? FirstName { get; set; }
        [Required]
        public string? LastName { get; set; }
        [Required]
        public string? Username { get; set; }
        [Required]
        public string? PhoneNumber { get; set; }
        [Required]
        public string? Email { get; set; }
        [Required]
        public bool IsAdmin { get; set; }
        [Required]
        public string? Role { get; set; }
    }
}
