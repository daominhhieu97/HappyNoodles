using HappyNoodles.Models.Entities;
using HappyNoodles.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

public class IdempotencyService : IIdempotencyService
{
    private readonly HappyNoodlesContext _dbContext;
    private readonly IJsonService _jsonService;

    public IdempotencyService(HappyNoodlesContext dbContext, IJsonService jsonService)
    {
        _dbContext = dbContext;
        _jsonService = jsonService;
    }

    public async Task<bool> HasBeenProcessed(Guid eventId, string eventType)
    {
        return await _dbContext.Events
            .AnyAsync(e => e.Id == eventId &&
                          e.EventType == eventType);
    }

    public async Task MarkAsProcessed(Guid eventId, string eventType, object payload)
    {
        await _dbContext.Events.AddAsync(new Event
        {
            Id = eventId,
            EventType = eventType,
            Payload = _jsonService.Serialize(payload),
            ProcessedAtUtc = DateTime.UtcNow,
            CreatedTimeUtc = DateTime.UtcNow,
            IsProcessed = true
        });

        await _dbContext.SaveChangesAsync();
    }
}