using AutoMapper;
using MyLink.Models.DTOS;

namespace MyLink.Models.Helpers
{
    public class TablesMapper: Profile
    {
        public TablesMapper() {
            CreateMap<User, UserDTO>();
            CreateMap<Post, PostDTO>()
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.User.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.User.LastName))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User.UserName))
                .ForMember(dest => dest.PictureURL, opt => opt.MapFrom(src => src.User.PictureURL));
            
            CreateMap<Job, JobDTO>()
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.User.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.User.LastName))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User.UserName))
                .ForMember(dest => dest.PictureURL, opt => opt.MapFrom(src => src.User.PictureURL));
        }
    }
}