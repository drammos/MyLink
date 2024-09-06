using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyLink.Models.DTOS
{
    public class ApplyForJobDTO
    {
        [Required]
        public int JobId { get; set; }
        [Required]
        public string Username { get; set; }
        public string? CovverLetter { get; set; }
    }
}
