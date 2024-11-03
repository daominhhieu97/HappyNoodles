namespace HappyNoodles.Models.Entities;

public class User : Entity
{
    public string Username { get; set; }

    public string Email { get; set; }

    public string PhoneNumber { get; set; } = string.Empty;

    public string Address { get; set; } = string.Empty;
    public bool Active { get; set; } = true;
}
