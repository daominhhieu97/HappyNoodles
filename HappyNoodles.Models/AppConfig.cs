using Microsoft.Extensions.Configuration;

namespace HappyNoodles.Models;

public class AppConfig(IConfiguration configuration)
{
    public string JwtIssuer => _configuration["Jwt:Issuer"];
    public string JwtAudience => _configuration["Jwt:Audience"];
    private readonly IConfiguration _configuration = configuration;

    // Example configuration properties
    public string JwtSecretKey => _configuration["Jwt:SecretKey"];
    public string FrontEndUrl => _configuration["FrontEndUrl"];
    // Add more properties as needed
    // Twilio settings
    public string TwilioAccountSid => _configuration["Twilio:AccountSid"];
    public string TwilioAuthToken => _configuration["Twilio:AuthToken"];
    public string TwilioPhoneNumber => _configuration["Twilio:PhoneNumber"];
    public string TwilioStoreKeeper => _configuration["Twilio:StoreKeeper"];
    public string RabbitMQHost => _configuration["RabbitMQ:Host"];
    public string RabbitMQUsername => _configuration["RabbitMQ:Username"];
    public string RabbitMQPassword => _configuration["RabbitMQ:Password"];
    public string RabbitMQVirtualHost => _configuration["RabbitMQ:VirtualHost"];
}