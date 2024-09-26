namespace MyLink.Models.DTOS
{
    public class ChatMessageDTO
    {
        public string OwnerUsername { get; set; }
        public string OwnerId { get; set; }
        public string MessageBody { get; set; }
        public string OwnerPictureURL { get; set; }
    }    
}
