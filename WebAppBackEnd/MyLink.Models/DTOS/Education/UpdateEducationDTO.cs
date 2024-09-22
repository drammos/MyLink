
using System.ComponentModel.DataAnnotations;

namespace MyLink.Models.DTOS
{
    public class UpdateEducationDTO
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string? School { get; set; }
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
