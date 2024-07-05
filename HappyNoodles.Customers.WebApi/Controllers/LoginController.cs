using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using HappyNoodles.Services.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

[ApiController]
[Route("api/[controller]")]
public class LoginController : ControllerBase
{
    private readonly AppConfig _appConfig;
    private readonly ILoginService _loginService;

    public LoginController(
        AppConfig appConfig,
        ILoginService loginService)
    {
        _appConfig = appConfig;
        _loginService = loginService;
    }

    [Route("signin")]
    public async Task SignIn() {
        await HttpContext.ChallengeAsync(GoogleDefaults.AuthenticationScheme, new AuthenticationProperties{
            RedirectUri = Url.Action("googleresponse")
        });
    }
    
    [HttpGet("google-response")]
    public async Task<IActionResult> GoogleResponse()
    {
        var authenticateResult = await HttpContext.AuthenticateAsync(GoogleDefaults.AuthenticationScheme);
        if (!authenticateResult.Succeeded)
            return Unauthorized();

        var claims = authenticateResult?.Principal?.Identities?.FirstOrDefault()?.Claims;
        if(claims == null)
        {
            return Unauthorized();
        }
        
        var email = claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value ?? string.Empty;
        var name = claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value ?? string.Empty;

        // Create JWT token
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_appConfig.JwtSecretKey); // Ensure to use a secure key
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(
            [
                new Claim(ClaimTypes.Email, email),
                new Claim(ClaimTypes.Name, name)
            ]),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            Audience = _appConfig.JwtAudience,
            Issuer = _appConfig.JwtIssuer,
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(token);

        var IsRegistered = await _loginService.IsRegistered(email);

        return Redirect($"{_appConfig.FrontEndUrl}/?token={tokenString}&isRegistered={IsRegistered.isRegistered.ToString().ToLowerInvariant()}&userId={IsRegistered.userId}");
    }
}