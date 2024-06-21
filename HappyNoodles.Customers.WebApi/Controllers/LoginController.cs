
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Mvc;

[Controller]
public class LoginController : ControllerBase
{    
    [Route("signin")]
    public async Task SignIn() {
        await HttpContext.ChallengeAsync(GoogleDefaults.AuthenticationScheme, new AuthenticationProperties{
            RedirectUri = Url.Action("googleresponse")
        });
    }
    [Route("googleresponse")]
    public async Task<IActionResult> GoogleResponse(){
        var result = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        var claims = result.Principal.Identities.FirstOrDefault().Claims.Select(x => new {
            x.Issuer, x.Type, x.Value
        });
        return new JsonResult(claims);
    }
}