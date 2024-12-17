namespace HappyNoodles.Models.Messages
{
    public class InventoryLow : Message
    {
        public List<Guid> ItemIds { get; set; } = [];
    }
}
