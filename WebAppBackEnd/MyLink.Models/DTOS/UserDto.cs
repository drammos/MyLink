
using System.ComponentModel.DataAnnotations;

namespace MyLink.Models.DTOS
{
    public class UserDTO
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string PhoneNumber { get; set; }
        public string PictureURL { get; set; }
        public string Email { get; set; }
        public string Role {  get; set; }
        public string Token { get; set; }
        public string Birthday { get; set; }
        public string? CoverLetterURL { get; set; }
        public string? WebPage { get; set; }
    }
}
