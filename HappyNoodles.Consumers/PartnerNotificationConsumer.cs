using HappyNoodles.Models.Messages;
using MassTransit;

public class PartnerNotificationConsumer : IConsumer<InventoryLow>
{
    public async Task Consume(ConsumeContext<InventoryLow> context)
    {
        var message = context.Message;

        // Notify partners (could be via email, API, etc.)
        Console.WriteLine($"Hey, i want to restock these items: {message.ItemIds.Select(x => x.ToString())}");
    }
}
