namespace MyLink.Models.DTOS
{
    public class ChatOutDTO
    {
        public string InterlocutorUsename{ get; set; }
        public string InterlocutorPictureURL { get; set; }
        public string InterlocutorFirstname { get; set; }
        public string InterlocutorLastname { get; set; }
        public string LastMessage { get; set; }
    }    
}
