using System.ComponentModel.DataAnnotations;

namespace MyLink.Models.DTOS
{
    public class CreateJobDTO
    {
        [Required]
        public string UserId { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string CompanyName { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Location { get; set; }
        [Required]
        public string WorkType { get; set; }
        [Required]
        public string LocationType { get; set; }
        [Required]
        public DateTime PostedDate { get; set; }
    }
}
