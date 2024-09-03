using System.ComponentModel.DataAnnotations;

namespace MyLink.Models.DTOS
{
    public class RegisterUserDTO: LoginUserDTO
    {
        [Required]
        public string? FirstName { get; set; }
        [Required]
        public string? LastName { get; set; }
        [Required]
        public string? PhoneNumber { get; set; }
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? Role { get; set; }
        [Required]
        public string? PictureURL { get; set; }
        [Required]
        public string Birthday { get; set; }
    }
}
