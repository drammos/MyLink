﻿
namespace MyLink.Models.DTOS
{
    public class UserDTO
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string PhoneNumber { get; set; }
        public string PictureURL { get; set; }
        public string Email { get; set; }

        public bool IsAdmin { get; set; }
    }
}