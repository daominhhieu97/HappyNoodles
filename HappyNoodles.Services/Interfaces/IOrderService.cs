using HappyNoodles.Models.Entities;

public interface IOrderService
{
    Task<OrderDto> SaveOrderAsync(OrderDto orderDto);
    Task<List<Order>> GetOrdersAsync();
    Task<Order> GetOrderDetailsAsync(Guid id);
}