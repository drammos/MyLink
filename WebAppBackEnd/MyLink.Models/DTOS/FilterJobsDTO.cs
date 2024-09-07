
using System.ComponentModel.DataAnnotations;

namespace MyLink.Models.DTOS
{
    public class FilterJobsDTO
    {
        [Required]
        public string UserId {get; }
        public int LastPostedDays { get; }
        public string LocationType { get; }
        public string WorkType { get; }
        public string Category { get; }
    }
}