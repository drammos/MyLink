using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MyLink.Models
{
    public class Job
    {
        [Key]
        public int Id { get; set; }
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
        public DateTime? ClosingDate { get; set; }

        [Required]
        [ForeignKey("UserId")]
        public string UserId { get; set; }
        public User User { get; set; }

        public ICollection<JobApplication> JobApplications { get; set; } = new List<JobApplication>();
    }
}
