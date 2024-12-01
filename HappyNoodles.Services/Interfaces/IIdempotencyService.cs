namespace HappyNoodles.Services.Interfaces;

public interface IIdempotencyService
{
    Task<bool> HasBeenProcessed(Guid eventId, string eventType);
    Task MarkAsProcessed(Guid eventId);
}