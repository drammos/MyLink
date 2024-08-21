
using System.ComponentModel.DataAnnotations;

namespace MyLink.Models.DTOS
{
    public class UpdateExperienceDTO
    {
        [Required]
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? EmploymentType { get; set; }
        public string? CompanyName { get; set; }
        public string? Location { get; set; }
        public string? LocationType { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool CurrentJob { get; set; }
        public string? Description { get; set; }
    }
}
