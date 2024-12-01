using HappyNoodles.Models.Messages;
using HappyNoodles.Services.Interfaces;
using MassTransit;
using Microsoft.Extensions.Logging;

public class MessageBusService : IMessageBusService
{
    private readonly IBus _bus;
    private readonly IIdempotencyService _idempotencyService;
    private readonly ILogger<MessageBusService> _logger;

    public MessageBusService(
        IBus bus,
        IIdempotencyService idempotencyService,
        ILogger<MessageBusService> logger)
    {
        _bus = bus;
        _idempotencyService = idempotencyService;
        _logger = logger;
    }

    public async Task PublishMessage<T>(T message) where T : Message
    {
        await PublishMessage(message, Guid.NewGuid());
    }

    public async Task PublishMessage<T>(T message, Guid? messageId) where T : Message
    {
        var id = messageId ?? Guid.NewGuid();
        var messageType = message.EventType;

        try
        {
            if (await _idempotencyService.HasBeenProcessed(id, messageType))
            {
                return;
            }

            await _bus.Publish(message, context => context.MessageId = id);

            await _idempotencyService.MarkAsProcessed(id, messageType, message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,
                $"Error publishing message {id} of type {messageType}: error message {ex.Message} with stack trace {ex.StackTrace}");
            throw;
        }
    }
}