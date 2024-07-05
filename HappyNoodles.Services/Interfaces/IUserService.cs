using HappyNoodles.DTOs;

namespace HappyNoodles.Services.Interfaces
{
    public interface IUserService
    {
        Task Register(RegisterUserRequest request);
    }
}