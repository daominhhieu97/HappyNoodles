namespace HappyNoodles.Services.Interfaces;

public interface ISmsService
{
    Task SendSmsAsync(string message);
}