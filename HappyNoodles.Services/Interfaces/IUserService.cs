using HappyNoodles.DTOs;

namespace HappyNoodles.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> GetUserAsync(Guid userId);
        Task Register(RegisterUserRequest request);
    }
}