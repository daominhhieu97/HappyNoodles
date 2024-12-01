namespace HappyNoodles.Models.Messages
{
    public class OrderCreated : Message
    {
        public string OrderCode { get; init; }
        public List<OrderItemDtoForEvent> Items { get; init; }
        public decimal TotalAmount { get; init; }
        public DateTime OrderDate { get; init; }
        public string DeliveryAddress { get; init; }
        public string PhoneNumber { get; init; }

        public OrderCreated(string orderCode, List<OrderItemDtoForEvent> items, decimal totalAmount,
            DateTime orderDate, string deliveryAddress, string phoneNumber)
        {
            OrderCode = orderCode;
            Items = items;
            TotalAmount = totalAmount;
            OrderDate = orderDate;
            DeliveryAddress = deliveryAddress;
            PhoneNumber = phoneNumber;
            EventType = EventTypes.OrderCreated;
        }
    }

    public class OrderItemDtoForEvent
    {
        public Guid ItemId { get; init; }
        public int Quantity { get; init; }
        public decimal Price { get; init; }

        public OrderItemDtoForEvent(Guid itemId, int quantity, decimal price)
        {
            ItemId = itemId;
            Quantity = quantity;
            Price = price;
        }
    }
}
