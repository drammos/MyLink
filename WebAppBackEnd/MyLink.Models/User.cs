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
        public string Birthday { get; set; }
        [Required]
        public string? PictureURL { get; set; }
        public ICollection<Education> Educations { get; } = new List<Education>();
        public ICollection<Experience> Experiences { get; } = new List<Experience>();
        public ICollection<Post> Posts { get; } = new List<Post>();
        public ICollection<User> ConnectedUsers { get; set; } = [];
        public ICollection<User> PendingRequestUsers { get; set; } = [];
        public ICollection<User> InComingRequestUsers { get; set; } = [];
        public ICollection<Job> PostedJobs { get; set; } = new List<Job>();
    }
}