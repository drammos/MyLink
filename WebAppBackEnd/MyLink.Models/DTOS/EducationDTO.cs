using System.ComponentModel.DataAnnotations;

namespace MyLink.Models.DTOS
{
    public class EducationDTO
    {
        [Required]
        public string? School { get; set; }
        [Required]
        public string? Username { get; set; }
        public string? Degree { get; set; }
        public string? FieldOfStudy { get; set; }
        public string? StartDate { get; set; }
        public string? EndDate { get; set; }
        public string? Grade { get; set; }
        public string? Description { get; set; }

    }
}
