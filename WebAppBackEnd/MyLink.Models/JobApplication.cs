using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MyLink.Models
{
    public class JobApplication
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [ForeignKey("JobId")]
        public int JobId { get; set; }
        public Job Job { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public DateTime AppliedDate { get; set; }
        public string? CoverLetter { get; set; }
        public JobApplicationStatus Status { get; set; } = JobApplicationStatus.Pending;
    }

    public enum JobApplicationStatus
    {
        Pending,
        Accepted,
        Rejected,
        Withdrawn
    }
}
