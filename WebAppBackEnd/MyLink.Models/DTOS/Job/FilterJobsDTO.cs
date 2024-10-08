using MyLink.Models.Pagination;
using System.ComponentModel.DataAnnotations;

namespace MyLink.Models.DTOS
{
    public class FilterJobsDTO : Params
    {
        [Required]
        public string UserId { get; set; }
        public int LastPostedDays { get; set; } = 180; 
        public string? LocationType { get; set; }
        public string? WorkType { get; set; }
        public string? Category { get; set; }
    }
}