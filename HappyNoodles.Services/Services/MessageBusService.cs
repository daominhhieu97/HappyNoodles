using HappyNoodles.Models.Messages;
using HappyNoodles.Services.Interfaces;
using MassTransit;
using Microsoft.Extensions.Logging;

public class MessageBusService(
    IBus bus,
    IIdempotencyService idempotencyService,
    ILogger<MessageBusService> logger,
    IEventService eventService,
    IMessageScheduler messageScheduler) : IMessageBusService
{
    public async Task PublishMessage<T>(T message) where T : Message
    {
        var eventId = await eventService.AddEvent(message);
        await PublishMessage(message, eventId);
    }

    public async Task PublishMessage<T>(T message, Guid? eventId) where T : Message
    {
        if (!eventId.HasValue)
        {
            eventId = await eventService.AddEvent(message);
        }

        var messageType = message.EventType;

        try
        {
            ///TODO: When it will be duplicated?
            if (await idempotencyService.HasBeenProcessed(eventId.GetValueOrDefault(), messageType))
            {
                return;
            }

            if (message.SendAtUtc.HasValue)
            {
                // Schedule message for future delivery
                await messageScheduler.SchedulePublish(
                    message.SendAtUtc.Value,
                     message);
            }
            else
            {
                await bus.Publish(message, context => context.MessageId = eventId);
            }

            ///TODO: Learn how to check the message processed successfully
            await idempotencyService.MarkAsProcessed(eventId.GetValueOrDefault());
        }
        catch (Exception ex)
        {
            logger.LogError(ex,
                $"Error publishing message {eventId} of type {messageType} at {DateTime.UtcNow}: error message {ex.Message} with stack trace {ex.StackTrace}");

            throw;
        }
    }
}