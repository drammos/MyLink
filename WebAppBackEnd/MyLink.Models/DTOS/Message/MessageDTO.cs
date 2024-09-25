namespace MyLink.Models.DTOS
{
    public class MessageDTO
    {
        public int Id { get; set; }
        public string? MessageBody { get; set; }
        
        //Recipient User
        public string? ReceiptUserId { get; set; }
        public string? ReceiptUsername { get; set; }
        public string? ReceiptPictureURL {get; set;}
        
        //Sender User
        public string? SenderUserId { get; set; }
        public string? SenderUsername{ get; set; }
        public string? SenderPictureURL { get; set; }
    }    
}