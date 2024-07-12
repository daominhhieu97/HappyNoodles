namespace HappyNoodles.Models;

public class User
{
    public Guid Id {get;set;}

    public required string Email {get;set;}
    
    public string? PhoneNumber {get;set;}

    public string? Address {get;set;}
}
