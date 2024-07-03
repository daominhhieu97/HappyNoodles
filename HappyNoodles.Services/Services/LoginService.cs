
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
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
        public async Task<bool> IsRegistered(string email)
        {            
            var isExistingUser = await _happyNoodlesContext.Users.AnyAsync(x => 
                x.Email.Equals(email) 
                && !string.IsNullOrEmpty(x.Address) 
                && !string.IsNullOrEmpty(x.PhoneNumber));

            if (!isExistingUser)
            {
                _happyNoodlesContext.Users.Add(new User(){
                    Email = email
                });
                await _happyNoodlesContext.SaveChangesAsync();
                return false;
            }

            return true;

        }
    }
}
