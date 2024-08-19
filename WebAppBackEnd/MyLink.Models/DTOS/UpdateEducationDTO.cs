
using System.ComponentModel.DataAnnotations;

namespace MyLink.Models.DTOS
{
    public class UpdateEducationDTO
    {
        [Required]
        public int Id { get; set; }
        public string? School { get; set; }
        public string? Degree { get; set; }
        public string? FieldOfStudy { get; set; }
        public string? StartDate { get; set; }
        public string? EndDate { get; set; }
        public string? Grade { get; set; }
        public string? Description { get; set; }
    }
}
