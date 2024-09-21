namespace MyLink.Models.DTOS
{   
    public class JobDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string CompanyName { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public string WorkType { get; set; }
        public string LocationType { get; set; }
        public string Category { get; set; }
        public DateTime PostedDate { get; set; }
        public bool IsActive { get; set; }
        public DateTime? ClosingDate { get; set; }

        public ICollection<JobApplication> JobApplications { get; set; } = new List<JobApplication>();
    
        // User details
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string PictureURL { get; set; }
    }
}