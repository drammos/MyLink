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

        public ICollection<Education> Educations { get; } = new List<Education>();
        public ICollection<Experience> Experiences { get; } = new List<Experience>();
        public ICollection<Post> Posts { get; } = new List<Post>();
        public ICollection<Comment> MyComments { get; set; } = new List<Comment>();
        public ICollection<Reaction> MyReactions { get; set; } = new List<Reaction>();
        public ICollection<User> ConnectedUsers { get; set; } = [];
        public ICollection<User> PendingRequestUsers { get; set; } = [];
        public ICollection<User> InComingRequestUsers { get; set; } = [];
    }
}