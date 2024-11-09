using AutoMapper;
using HappyNoodles.Models.Dtos;
using HappyNoodles.Models.Entities;

public class MenuMappingProfile : Profile
{
    public MenuMappingProfile()
    {
        CreateMap<Menu, MenuDto>();
        CreateMap<Category, CategoryDto>();
        CreateMap<Item, ItemDto>();
    }
}