using FluentValidation;

public class UserValidator : AbstractValidator<UserDto>
{
    public UserValidator()
    {
        RuleFor(x => x.Email).Equal("asdfadf@gmail.com").WithMessage("cannot use this");
    }
}