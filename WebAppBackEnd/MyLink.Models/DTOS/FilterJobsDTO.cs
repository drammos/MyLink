using System.ComponentModel.DataAnnotations;

namespace MyLink.Models.DTOS
{
    public class FilterJobsDTO
    {
        [Required]
        public string UserId { get; set; }
        public int LastPostedDays { get; set; }
        public string? LocationType { get; set; }
        public string? WorkType { get; set; }
        public string? Category { get; set; }
    }
}