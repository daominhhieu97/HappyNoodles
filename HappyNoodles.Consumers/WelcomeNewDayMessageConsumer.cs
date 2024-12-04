using HappyNoodles.Services.Interfaces;
using MassTransit;

namespace HappyNoodles.Consumers
{
    public class WelcomeNewDayMessageConsumer : IConsumer<WelcomeNewDayMessage>
{
    private readonly ISmsService _smsService;

    public WelcomeNewDayMessageConsumer(ISmsService smsService)
    {
        _smsService = smsService;
    }

    public async Task Consume(ConsumeContext<WelcomeNewDayMessage> context)
    {
        var message = context.Message;

        if (message == null)
            return;

            var smsMessage = message.Text;

        await _smsService.SendSmsAsync(smsMessage);
    }
}
}
