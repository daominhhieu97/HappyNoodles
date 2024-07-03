namespace HappyNoodles.Services.Interfaces
{
    public interface ILoginService
    {
        Task<bool> IsRegistered(string email);
    }
}
