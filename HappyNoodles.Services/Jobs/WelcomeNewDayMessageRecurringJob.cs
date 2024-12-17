using HappyNoodles.Consumers;
using HappyNoodles.Services.Interfaces;
using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HappyNoodles.Services.Jobs
{
    public class WelcomeNewDayMessageRecurringJob : IJob
    {
        private readonly IMessageBusService _messageBus;

        public WelcomeNewDayMessageRecurringJob(IMessageBusService messageBus)
        {
            _messageBus = messageBus;
        }

        public async Task Execute(IJobExecutionContext context)
        {
            var message = new WelcomeNewDayMessage("Have a nice day. You're the best");

            await _messageBus.PublishMessage(message);
        }
    }
}
