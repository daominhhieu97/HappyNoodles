using AutoMapper;
using HappyNoodles.Models.Dtos;
using HappyNoodles.Models.Entities;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserDto>().ReverseMap();
    }
}
