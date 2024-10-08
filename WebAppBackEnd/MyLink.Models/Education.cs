﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyLink.Models
{
    public class Education
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? School { get; set; }
        public string? Degree { get; set; }
        public string? FieldOfStudy { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? Grade { get; set; }
        public string? Description { get; set; }
        [Required]
        public bool IsPublic { get; set; }
        [Required]
        [ForeignKey("UserId")]
        public string? UserId { get; set; }
        public User User { get; set; } = null!;
    }
}
