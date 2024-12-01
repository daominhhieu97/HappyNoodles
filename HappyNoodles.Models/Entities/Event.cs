namespace HappyNoodles.Models.Entities
{
    public class Event : Entity
    {
        public string EventType { get; set; } = string.Empty;

        public string? Payload { get; set; }

        public bool IsProcessed { get; set; }

        public DateTime CreatedTimeUtc { get; set; }

        public DateTime? ProcessedAtUtc { get; set; }
    }
}
