using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyLink.Models
{
    public class ViewedJobs
    {
        [Required] 
        public int Id { get; set; }

        [Required] 
        public string? Username { get; set; }

        [Required] 
        public int JobId { get; set; }
        [ForeignKey("JobId")] 
        public Job Job { get; set; } = null!;
    }
}