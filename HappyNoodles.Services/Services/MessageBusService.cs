using HappyNoodles.Models.Messages;
using HappyNoodles.Services.Interfaces;
using MassTransit;
using Microsoft.Extensions.Logging;

public class MessageBusService : IMessageBusService
{
    private readonly IBus _bus;
    private readonly IIdempotencyService _idempotencyService;
    private readonly ILogger<MessageBusService> _logger;
    private readonly IEventService _eventService;

    public MessageBusService(
        IBus bus,
        IIdempotencyService idempotencyService,
        ILogger<MessageBusService> logger,
        IEventService eventService)
    {
        _bus = bus;
        _idempotencyService = idempotencyService;
        _logger = logger;
        _eventService = eventService;
    }

    public async Task PublishMessage<T>(T message) where T : Message
    {
        var eventId = await _eventService.AddEvent(message);
        await PublishMessage(message, eventId);
    }

    public async Task PublishMessage<T>(T message, Guid? eventId) where T : Message
    {
        if (!eventId.HasValue)
        {
            eventId = await _eventService.AddEvent(message);
        }

        var messageType = message.EventType;

        try
        {
            if (await _idempotencyService.HasBeenProcessed(eventId.GetValueOrDefault(), messageType))
            {
                return;
            }

            await _bus.Publish(message, context => context.MessageId = eventId);

            ///TODO: Learn how to check the message processed successfully
            await _idempotencyService.MarkAsProcessed(eventId.GetValueOrDefault());
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,
                $"Error publishing message {eventId} of type {messageType} at {DateTime.UtcNow}: error message {ex.Message} with stack trace {ex.StackTrace}");
            throw;
        }
    }
}