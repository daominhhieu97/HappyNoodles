using HappyNoodles.Models.Messages;

namespace HappyNoodles.Services.Interfaces
{
    public interface IEventService
    {
        Task<Guid> AddEvent(Message message);
    }
}
