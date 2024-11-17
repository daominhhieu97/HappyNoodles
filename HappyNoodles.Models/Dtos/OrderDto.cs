public class OrderItemDto
{
    public Guid? ItemId { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
}

public class OrderDto
{
    public Guid? Id { get; set; }
    public string DeliveryAddress { get; set; }
    public string PhoneNumber { get; set; }
    public string OrderCode { get; set; }
    public DateTime? OrderDate { get; set; }
    public List<OrderItemDto> Items { get; set; }
}