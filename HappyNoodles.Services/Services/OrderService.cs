using HappyNoodles.Models.Entities;
using Microsoft.EntityFrameworkCore;

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
                ItemId = i.ItemId!.Value,
                Quantity = i.Quantity,
                Price = i.Price
            }).ToList()
        };

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        return orderDto;
    }

    public async Task<List<Order>> GetOrdersAsync()
    {
        return await _context.Orders
            .Include(o => o.Items)
            .ToListAsync();
    }

    public async Task<Order> GetOrderDetailsAsync(Guid id)
    {
        return await _context.Orders
            .Include(o => o.Items)
            .ThenInclude(x => x.Item)
            .FirstOrDefaultAsync(o => o.Id == id);
    }
}