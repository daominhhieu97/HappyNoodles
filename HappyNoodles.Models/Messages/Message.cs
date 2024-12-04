namespace HappyNoodles.Models.Messages
{
    public class Message
    {
        public string EventType { get; init; } = string.Empty;
        public DateTime? SendAtUtc { get; set; }
    }
}