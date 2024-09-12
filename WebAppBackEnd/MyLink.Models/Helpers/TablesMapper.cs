using AutoMapper;
using MyLink.Models.DTOS;

namespace MyLink.Models.Helpers
{
    public class TablesMapper: Profile
    {
        public TablesMapper() {
            CreateMap<User, UserDTO>();
        }
    }
}