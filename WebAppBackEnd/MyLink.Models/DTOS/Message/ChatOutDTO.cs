namespace MyLink.Models.DTOS
{
    public class ChatOutDTO
    {
        public string InterlocutorUsername{ get; set; }
        public string InterlocutorPictureURL { get; set; }
        public string InterlocutorFirstname { get; set; }
        public string InterlocutorLastname { get; set; }
        public string InterlocutorUserId {get;set;}
        public string LastMessage { get; set; }
    }    
}
