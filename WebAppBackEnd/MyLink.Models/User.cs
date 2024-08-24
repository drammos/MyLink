using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace MyLink.Models
{
    public class User : IdentityUser
    {
        [Required]
        public string? FirstName { get; set; }
        [Required]
        public string? LastName { get; set; }
        [Required]
        public string? PictureURL { get; set; }

        //Educations
        public ICollection<Education> Educations { get; } = new List<Education>();
        //Experience
        public ICollection<Experience> Experiences { get; } = new List<Experience>();
        //Connection with other users
        public ICollection<User> ConnectedUsers { get; } = new List<User>()!;
        //Request from User to other users
        public ICollection<User> PendingUserRequests { get; } = new List<User>()!;
        //Requests from other users to my User
        public ICollection<User> InComingUserRequests { get; } = new List<User>()!;
    }
}