﻿using Microsoft.AspNetCore.Identity;
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
        public string? CoverLetterURL { get; set; }
        public string? WebPage { get; set; }
        public bool IsAdmin { get; set; }
        public ICollection<Message> Messages { get;} = new List<Message>();
        public ICollection<Education> Educations { get; } = new List<Education>();
        public ICollection<Experience> Experiences { get; } = new List<Experience>();
        public ICollection<Post> Posts { get; } = new List<Post>();
        public ICollection<User> ConnectedUsers { get; set; } = [];
        public ICollection<User> PendingRequestUsers { get; set; } = [];
        public ICollection<User> InComingRequestUsers { get; set; } = [];
        public ICollection<Job> PostedJobs { get; set; } = new List<Job>();
    }
}