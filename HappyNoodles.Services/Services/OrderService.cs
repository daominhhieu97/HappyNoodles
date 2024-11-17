using HappyNoodles.Models.Entities;

public class OrderService : IOrderService
{
    private readonly HappyNoodlesContext _context;

    public OrderService(HappyNoodlesContext context)
    {
        _context = context;
    }

    public async Task<OrderDto> SaveOrderAsync(OrderDto orderDto)
    {
        var order = new Order
        {
            DeliveryAddress = orderDto.DeliveryAddress,
            PhoneNumber = orderDto.PhoneNumber,
            OrderCode = orderDto.OrderCode,
            OrderDate = DateTime.UtcNow,
            Items = orderDto.Items.Select(i => new OrderItem
            {
                Quantity = i.Quantity,
                Price = i.Price
            }).ToList()
        };

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        return orderDto;
    }
}