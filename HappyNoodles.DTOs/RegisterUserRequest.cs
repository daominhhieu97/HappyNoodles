using System.ComponentModel.DataAnnotations;

namespace HappyNoodles.DTOs
{
    public class RegisterUserRequest
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public required string PhoneNumber { get; set; }

        [Required]
        public required string Address { get; set; }
    }
}