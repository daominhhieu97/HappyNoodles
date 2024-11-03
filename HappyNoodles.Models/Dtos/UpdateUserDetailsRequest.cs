using System.ComponentModel.DataAnnotations;

namespace HappyNoodles.Models.Dtos
{
    public class UpdateUserDetailsRequest
    {
        [Required]
        public Guid Id { get; set; }

        public string? PhoneNumber { get; set; }

        public string? Address { get; set; }
    }
}