namespace HappyNoodles.Services
{
    public interface ILoginService{
        Task<bool> IsRegistered(string email);
    }
}