using HappyNoodles.Models.Entities;
using HappyNoodles.Models.Messages;
using MassTransit;
using Microsoft.EntityFrameworkCore;

public class OrderService : IOrderService
{
    private readonly HappyNoodlesContext _context;
    private readonly IPublishEndpoint _publishEndpoint;

    public OrderService(
        HappyNoodlesContext context, 
        IPublishEndpoint publishEndpoint)
    {
        _context = context;
        _publishEndpoint = publishEndpoint;
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

        var totalAmount = order.Items.Sum(i => i.Price * i.Quantity);

        await _publishEndpoint.Publish(new OrderCreated(
            order.OrderCode,
            order.Items.Select(i => new OrderItemDtoForEvent(i.ItemId, i.Quantity, i.Price)).ToList(),
            totalAmount,
            order.OrderDate,
            order.DeliveryAddress,
            order.PhoneNumber
        ));

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