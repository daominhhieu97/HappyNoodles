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

public class OrderSummaryDto
{
    public Guid Id { get; set; }
    public string OrderCode { get; set; }
    public DateTime OrderDate { get; set; }
    public decimal Total { get; set; }
}

public class OrderLineItemDto
{
    public string Name { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
    public decimal Subtotal { get; set; }
}

public class OrderDetailDto
{
    public string OrderCode { get; set; }
    public DateTime OrderDate { get; set; }
    public string DeliveryAddress { get; set; }
    public string PhoneNumber { get; set; }
    public List<OrderLineItemDto> LineItems { get; set; }
    public decimal Total { get; set; }
}