using HappyNoodles.Models;
using HappyNoodles.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using Twilio;
using Twilio.Types;
using Twilio.Rest.Api.V2010.Account;

namespace HappyNoodles.Services.Services;

public class SmsService : ISmsService
{
    private readonly string _accountSid;
    private readonly string _authToken;
    private readonly string _twilioPhoneNumber;
    private readonly AppConfig _appConfig;

    public SmsService(AppConfig appConfig)
    {
        _appConfig = appConfig;
        _accountSid = _appConfig.TwilioAccountSid;
        _authToken = _appConfig.TwilioAuthToken;
        _twilioPhoneNumber = _appConfig.TwilioPhoneNumber;

        TwilioClient.Init(_accountSid, _authToken);
    }

    public async Task SendSmsAsync(string message)
    {
        var messageOptions = new CreateMessageOptions(
           new PhoneNumber(_appConfig.TwilioStoreKeeper))
        {
            From = new PhoneNumber(_twilioPhoneNumber),
            Body = message
        };

        await MessageResource.CreateAsync(messageOptions);
    }
}