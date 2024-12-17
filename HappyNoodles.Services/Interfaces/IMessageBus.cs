using HappyNoodles.Models.Messages;

namespace HappyNoodles.Services.Interfaces;

public interface IMessageBusService
{
    Task PublishMessage<T>(T message) where T : Message;
    Task PublishMessage<T>(T message, Guid? messageId) where T : Message;
}