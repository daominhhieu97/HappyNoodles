using HappyNoodles.Models;
using HappyNoodles.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HappyNoodles.Services.Services
{
    public class LoginService : ILoginService{
        private readonly HappyNoodlesContext _happyNoodlesContext;
        public LoginService(HappyNoodlesContext happyNoodlesContext)
        {
            _happyNoodlesContext = happyNoodlesContext;
        }
        public async Task<(bool isRegistered, Guid userId)> IsRegistered(string email, string username)
        {            
            var isExistingUser = await _happyNoodlesContext.Users.SingleOrDefaultAsync(x => 
                x.Email.Equals(email) && x.Username.Equals(username));

            if (isExistingUser == null)
            {
                var newUser = new User{
                    Email = email,
                    Username = username
                };
                _happyNoodlesContext.Users.Add(newUser);

                await _happyNoodlesContext.SaveChangesAsync();
                return (false, newUser.Id);
            }

            if(string.IsNullOrEmpty(isExistingUser.Address) && string.IsNullOrEmpty(isExistingUser.PhoneNumber))
            {
                return (false, isExistingUser.Id);
            }

            return (true,isExistingUser.Id);

        }
    }
}
