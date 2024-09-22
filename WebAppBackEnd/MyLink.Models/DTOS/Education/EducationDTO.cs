using System.ComponentModel.DataAnnotations;

namespace MyLink.Models.DTOS
{
    public class EducationDTO
    {
        [Required]
        public string? School { get; set; }
        [Required]
        public string? UserId { get; set; }
        public string? Degree { get; set; }
        public string? FieldOfStudy { get; set; }
        [Required]
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? Grade { get; set; }
        public string? Description { get; set; }
        [Required]
        public bool IsPublic { get; set; }
    }
}
