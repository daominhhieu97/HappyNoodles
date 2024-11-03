using HappyNoodles_ManagementApp.Models.Enums;

namespace HappyNoodles.Models.Entities
{
    public class Item : Entity
    {
        public required string Name { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public Guid CategoryId { get; set; }
        public AvailableStatuses AvailableStatus
        {
            get
            {
                if (RemainingItem == 0)
                {
                    return AvailableStatuses.OutOfStock;
                }

                return AvailableStatuses.InStock;
            }
        }
        public int RemainingItem { get; set; }
        public Category Category { get; set; }
        public string? PictureUrl { get; set; }
    }
}