using AutoMapper;
using HappyNoodles.Models.Dtos;
using HappyNoodles.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HappyNoodles.Services.Services
{
    public class UserService : IUserService
    {
        private readonly HappyNoodlesContext _happyNoodlesContext;
        private readonly IMapper _mapper;

        public UserService(
            HappyNoodlesContext happyNoodlesContext,
            IMapper mapper)
        {
            _happyNoodlesContext = happyNoodlesContext;
            _mapper = mapper;
        }

        public async Task<UserDto> GetUserAsync(Guid userId)
        {
            var user = await _happyNoodlesContext.Users.SingleOrDefaultAsync(x => x.Id == userId);
            var dto = _mapper.Map<UserDto>(user);
            return dto;
        }

        public async Task InactiveUser(Guid userId)
        {
            var user = await _happyNoodlesContext.Users.SingleOrDefaultAsync(x => x.Id == userId);

            if (user == null)
            {
                throw new Exception($"User {userId} does not exist");
            }

            user.Active = false;

            await _happyNoodlesContext.SaveChangesAsync();
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

        public async Task UpdateUserDetails(UpdateUserDetailsRequest request)
        {
            var user = await _happyNoodlesContext.Users.FirstOrDefaultAsync(x => x.Id == request.Id);

            if (user == null)
                throw new Exception($"No any user with user id {request.Id}");

            user.Address = request.Address;
            user.PhoneNumber = request.PhoneNumber;

            await _happyNoodlesContext.SaveChangesAsync();
        }
    }
}