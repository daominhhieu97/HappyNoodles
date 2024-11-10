namespace HappyNoodles.Models.Dtos
{
    public class ItemDetailsDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string CategoryName { get; set; }
        public string AvailableStatus { get; set; }
        public int RemainingItem { get; set; }
        public string PictureUrl { get; set; }
    }
}