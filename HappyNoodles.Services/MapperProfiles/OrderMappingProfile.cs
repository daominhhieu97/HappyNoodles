using AutoMapper;
using HappyNoodles.Models.Entities;

public class OrderMappingProfile : Profile
{
    public OrderMappingProfile()
    {
        CreateMap<Order, OrderSummaryDto>()
            .ForMember(dest => dest.Total, opt => opt.MapFrom(src => src.Items.Sum(i => i.Price * i.Quantity)));

        CreateMap<OrderItem, OrderLineItemDto>()
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Item.Name)) // Replace with actual item name mapping
            .ForMember(dest => dest.Subtotal, opt => opt.MapFrom(src => src.Price * src.Quantity));

        CreateMap<Order, OrderDetailDto>()
            .ForMember(dest => dest.LineItems, opt => opt.MapFrom(src => src.Items))
            .ForMember(dest => dest.Total, opt => opt.MapFrom(src => src.Items.Sum(i => i.Price * i.Quantity)));
    }
}