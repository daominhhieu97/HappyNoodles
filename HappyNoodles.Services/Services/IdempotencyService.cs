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
            .AnyAsync(e => e.Id == eventId 
            && e.EventType == eventType
            && e.IsProcessed);
    }

    public async Task MarkAsProcessed(Guid eventId)
    {
        var eventEntity = await _dbContext.Events
            .FirstOrDefaultAsync(x => x.Id == eventId)
            ?? throw new Exception("Cannot found any matched event");

        eventEntity.ProcessedAtUtc = DateTime.UtcNow;
        eventEntity.IsProcessed = true;

        await _dbContext.SaveChangesAsync();
    }
}