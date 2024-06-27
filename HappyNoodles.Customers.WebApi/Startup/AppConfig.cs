public class AppConfig
{
    public string JwtIssuer => _configuration["Jwt:Issuer"];
    public string JwtAudience => _configuration["Jwt:Audience"];
    private readonly IConfiguration _configuration;

    public AppConfig(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    // Example configuration properties
    public string JwtSecretKey => _configuration["Jwt:SecretKey"];
    public string FrontEndUrl => _configuration["FrontEndUrl"];
    // Add more properties as needed
}