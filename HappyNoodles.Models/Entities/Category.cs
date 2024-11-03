namespace HappyNoodles.Models.Entities
{
    public class Category : Entity
    {
        public string Name { get; set; }
        public Guid MenuId { get; set; }
        public Menu Menu { get; set; }
        public ICollection<Item> Items { get; set; } = [];
    }
}