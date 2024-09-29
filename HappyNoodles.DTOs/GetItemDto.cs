namespace HappyNoodles.DTOs
{
    public class GetItemDto
    {
        public MenuDto MyProperty { get; set; }
    }

    public class MenuDto
    {
        public string Name { get; set; }
        public List<CategoryDto> Categories { get; set; }
    }

    public class CategoryDto
    {
        public string Name { get; set; }

        public List<ItemDto> Items { get; set; }
    }

    public class ItemDto
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
    }
}