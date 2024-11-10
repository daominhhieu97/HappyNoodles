using AutoMapper;
using HappyNoodles.Models.Dtos;
using HappyNoodles.Models.Entities;

public class ItemMappingProfile : Profile
{
    public ItemMappingProfile()
    {
        CreateMap<Item, ItemDetailsDto>()
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
            .ForMember(dest => dest.AvailableStatus, opt => opt.MapFrom(src => src.AvailableStatus.ToString()));
    }
}