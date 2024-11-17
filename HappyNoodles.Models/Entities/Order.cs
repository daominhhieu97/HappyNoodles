namespace HappyNoodles.Models.Entities
{
    public class Order : Entity
    {
        public string DeliveryAddress { get; set; }
        public string PhoneNumber { get; set; }
        public string OrderCode { get; set; }
        public DateTime OrderDate { get; set; }
        public List<OrderItem> Items { get; set; }
    }

    public class OrderItem : Entity
    {
        public Guid OrderId { get; set; }
        public Guid ItemId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public Order Order { get; set; }
        public Item Item { get; set; }
    }

}
