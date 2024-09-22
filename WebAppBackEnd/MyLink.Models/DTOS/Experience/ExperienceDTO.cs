using System.ComponentModel.DataAnnotations;

namespace MyLink.Models.DTOS
{
    public class ExperienceDTO
    {
        [Required]
        public string? UserId { get; set; }
        [Required]
        public string? Title { get; set; }
        public string? EmploymentType { get; set; }
        [Required]
        public string? CompanyName { get; set; }
        public string? Location { get; set; }
        public string? LocationType { get; set; }
        [Required]
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        [Required]
        public bool CurrentJob { get; set; }
        public string? Description { get; set; }
        [Required]
        public bool IsPublic { get; set; }
    }
}
