using HappyNoodles.Models.Entities;
using HappyNoodles.Models.Messages;
using HappyNoodles.Services.Interfaces;

namespace HappyNoodles.Services.Services
{
    public class EventService : IEventService
    {
        private readonly HappyNoodlesContext _dbContext;
        private readonly IJsonService _jsonService;

        public EventService(HappyNoodlesContext happyNoodlesContext, IJsonService jsonService)
        {
            this._dbContext = happyNoodlesContext;
            _jsonService = jsonService;
        }

        public async Task<Guid> AddEvent(Message message)
        {
            var id = Guid.NewGuid();

            await _dbContext.Events.AddAsync(new Event
            {
                Id = id,
                EventType = message.EventType,
                Payload = _jsonService.Serialize(message),
                CreatedTimeUtc = DateTime.UtcNow
            });

            await _dbContext.SaveChangesAsync();

            return id;
        }
    }
}
