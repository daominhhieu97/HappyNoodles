namespace HappyNoodles.Services.Interfaces
{
    public interface ILoginService
    {
        Task<(bool isRegistered, Guid userId, bool isActive)> IsRegistered(string email, string username);
    }
}
