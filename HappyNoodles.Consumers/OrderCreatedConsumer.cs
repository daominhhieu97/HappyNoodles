using HappyNoodles.Models.Messages;
using HappyNoodles.Services.Interfaces;
using MassTransit;

public class OrderCreatedConsumer : IConsumer<OrderCreated>
{
    private readonly ISmsService _smsService;

    public OrderCreatedConsumer(ISmsService smsService)
    {
        _smsService = smsService;
    }

    public async Task Consume(ConsumeContext<OrderCreated> context)
    {
        var message = context.Message;

        if (message == null)
            return;

        var smsMessage = $"New order received: {message.OrderCode}\n" +
            $"Total: ${message.TotalAmount:F2}\n" +
            $"Items: {message.Items.Count}\n" +
            $"Delivery: {message.DeliveryAddress}\n" +
            $"Order Date: {message.OrderDate}\n" +
            $"Thank you for your order!";

        await _smsService.SendSmsAsync(smsMessage);
    }
}