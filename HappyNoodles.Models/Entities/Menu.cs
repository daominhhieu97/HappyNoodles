namespace HappyNoodles.Models.Entities
{
    public class Menu : Entity
    {
        public string Name { get; set; } = string.Empty;
        public ICollection<Category> Categories { get; set; } = [];
    }
}