using HappyNoodles.Models.Entities;
using HappyNoodles.Models.Messages;
using HappyNoodles.Services.Interfaces;
using MassTransit;
using Microsoft.EntityFrameworkCore;

public class OrderCreatedConsumer : IConsumer<OrderCreated>
{
    private readonly ISmsService _smsService;
    private readonly HappyNoodlesContext happyNoodlesContext;
    private readonly IMessageBusService messageBusService;

    public OrderCreatedConsumer(
        ISmsService smsService,
        HappyNoodlesContext happyNoodlesContext,
        IMessageBusService messageBusService)
    {
        _smsService = smsService;
        this.happyNoodlesContext = happyNoodlesContext;
        this.messageBusService = messageBusService;
    }

    public async Task Consume(ConsumeContext<OrderCreated> context)
    {
        var message = context.Message;

        if (message == null)
            return;
        var itemIds = message.Items.Select(x => x.ItemId);
        var items = await happyNoodlesContext.Items.Where(x => itemIds.Any(i => i == x.Id)).ToListAsync();

        var lowItems = new List<Guid>();

        foreach(var item in items)
        {
            var orderingItem = message.Items.First(i => i.ItemId == item.Id);
            item.RemainingItem = item.RemainingItem - orderingItem.Quantity;

            if(item.RemainingItem < 100)
            {
                lowItems.Add(item.Id);

            }
        }

        var lowQuantityItemMessage = new InventoryLow()
                {
                    ItemIds = lowItems
                };

        await messageBusService.PublishMessage(lowQuantityItemMessage);


        var smsMessage = $"New order received: {message.OrderCode}\n" +
            $"Total: ${message.TotalAmount:F2}\n" +
            $"Items: {message.Items.Count}\n" +
            $"Delivery: {message.DeliveryAddress}\n" +
            $"Order Date: {message.OrderDate}\n" +
            $"Thank you for your order!";

        await _smsService.SendSmsAsync(smsMessage);
    }
}