using HappyNoodles.Models.Entities;
using HappyNoodles.Models.Messages;
using HappyNoodles.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

public class OrderService : IOrderService
{
    private readonly HappyNoodlesContext _context;
    private readonly IMessageBusService _messageBusService;

    public OrderService(
        HappyNoodlesContext context,
        IMessageBusService messageBusService)
    {
        _context = context;
        _messageBusService = messageBusService;
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

        var orderCreatedEvent = new OrderCreated(
            order.OrderCode,
            order.Items.Select(i => new OrderItemDtoForEvent(i.ItemId, i.Quantity, i.Price)).ToList(),
            totalAmount,
            order.OrderDate,
            order.DeliveryAddress,
            order.PhoneNumber
        );
        orderCreatedEvent.SendAtUtc = DateTime.UtcNow + TimeSpan.FromSeconds(15);

        await _messageBusService.PublishMessage(orderCreatedEvent);

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