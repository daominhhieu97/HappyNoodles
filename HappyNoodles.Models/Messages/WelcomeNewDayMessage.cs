using HappyNoodles.Models.Messages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HappyNoodles.Consumers
{
    public class WelcomeNewDayMessage : Message
    {
        public string Text { get; set; }

        public WelcomeNewDayMessage(string text)
        {
            Text = text;
        }
    }
}
