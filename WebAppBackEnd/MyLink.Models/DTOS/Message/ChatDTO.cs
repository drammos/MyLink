using System.ComponentModel.DataAnnotations;
using MyLink.Models.Pagination;

namespace MyLink.Models.DTOS
{
    public class ChatDTO : Params
    {
        [Required]
        public string MyUsename { get; set; }
        [Required]
        public string InterlocutorUsename { get; set;}
    }
}