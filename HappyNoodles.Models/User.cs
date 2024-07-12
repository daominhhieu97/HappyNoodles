namespace HappyNoodles.Models;

public class User
{
    public Guid Id {get;set;}

    public string Username {get;set;}

    public string Email {get;set;}
    
    public string PhoneNumber {get;set;} = string.Empty;

    public string Address {get;set;} = string.Empty;
}
