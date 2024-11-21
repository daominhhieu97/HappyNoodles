namespace HappyNoodles.Models.Messages
{
    public record OrderCreated(
    string OrderCode,
    List<OrderItemDtoForEvent> Items,
    decimal TotalAmount,
    DateTime OrderDate,
    string DeliveryAddress,
    string PhoneNumber
    );

    public record OrderItemDtoForEvent(Guid ItemId, int Quantity, decimal Price);
}
