using HappyNoodles_ManagementApp.Models.Enums;

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
    public string Name { get; set; }
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public Guid CategoryId { get; set; }
    public AvailableStatuses AvailableStatus { get; set; }
    public int RemainingItem { get; set; }
    public string? PictureUrl { get; set; }
}