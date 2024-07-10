using AutoMapper;
using FluentValidation;
using HappyNoodles.DTOs;
using HappyNoodles.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HappyNoodles.Services.Services
{
    public class UserService : IUserService
    {
        private readonly HappyNoodlesContext _happyNoodlesContext;
        private readonly IMapper _mapper;
        private readonly IValidator<UserDto> _userValidator;

        public UserService(
            HappyNoodlesContext happyNoodlesContext,
            IMapper mapper,
            IValidator<UserDto> userValidator)
        {
            _happyNoodlesContext = happyNoodlesContext;
            _mapper = mapper;
            _userValidator = userValidator;
        }

        public async Task<UserDto> GetUserAsync(string email)
        {
            var user = await _happyNoodlesContext.Users.FirstOrDefaultAsync(x => x.Email.Equals(email));
            var dto = _mapper.Map<UserDto>(user);
            var validationResult = _userValidator.Validate(dto);
            if(!validationResult.IsValid)
            {
                throw new Exception(validationResult.Errors.FirstOrDefault().ErrorMessage);
            }
            
            return dto;
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