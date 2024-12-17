using HappyNoodles.Models.Messages;
using HappyNoodles.Services.Interfaces;
using MassTransit;
using Microsoft.EntityFrameworkCore;

public class OwnerNotificationConsumer : IConsumer<InventoryLow>
{
    private readonly ISmsService _smsService;
    private readonly HappyNoodlesContext _happyNoodlesContext;

    public OwnerNotificationConsumer(
        ISmsService smsService, 
        HappyNoodlesContext happyNoodlesContext)
    {
        _smsService = smsService;
        _happyNoodlesContext = happyNoodlesContext;
    }

    public async Task Consume(ConsumeContext<InventoryLow> context)
    {
        var message = context.Message;

        var items = await _happyNoodlesContext.Items
            .Where(x => message.ItemIds.Any(i => i == x.Id))
            .ToListAsync();

        foreach(var item in items)
        {
            var smsMessage = $"Inventory Alert: {item.Name} is low. Only {item.RemainingItem} left.";
            await _smsService.SendSmsAsync(smsMessage);
        }
    }
}
