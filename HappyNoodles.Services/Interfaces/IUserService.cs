using HappyNoodles.DTOs;

namespace HappyNoodles.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> GetUserAsync(string email);
        Task Register(RegisterUserRequest request);
    }
}