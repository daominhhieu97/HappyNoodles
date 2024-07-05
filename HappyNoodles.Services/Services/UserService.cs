using HappyNoodles.DTOs;
using HappyNoodles.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HappyNoodles.Services.Services
{
    public class UserService : IUserService
    {
        private readonly HappyNoodlesContext _happyNoodlesContext;

        public UserService(HappyNoodlesContext happyNoodlesContext)
        {
            _happyNoodlesContext = happyNoodlesContext;
        }

        public async Task Register(RegisterUserRequest request)
        {
            var user = await _happyNoodlesContext.Users.SingleOrDefaultAsync(x => x.Id == request.Id);

            if (user == null)
            {
                throw new Exception($"User {request.Id} does not exist");
            }

            user.PhoneNumber = request.PhoneNumber;
            user.Address = request.Address;

            await _happyNoodlesContext.SaveChangesAsync();
        }
    }
}