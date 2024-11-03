namespace HappyNoodles.Models.Dtos;

public class MenuDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public List<CategoryDto> Categories { get; set; } = [];
}

public class CategoryDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;

    public List<ItemDto> Items { get; set; } = [];
}

public class ItemDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Description { get; set; } = string.Empty;
    public int RemainingItem { get; set; }
}