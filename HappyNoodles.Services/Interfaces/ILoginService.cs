namespace HappyNoodles.Services.Interfaces
{
    public interface ILoginService
    {
        Task<(bool isRegistered, Guid userId)> IsRegistered(string email, string username);
    }
}
