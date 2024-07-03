
using HappyNoodles.Services.Interfaces;

namespace HappyNoodles.Services.Services
{
    public class LoginService : ILoginService{
        public LoginService(){
            
        }
        public Task<bool> IsRegistered(string email)
        {
            throw new NotImplementedException();
        }
    }
}
