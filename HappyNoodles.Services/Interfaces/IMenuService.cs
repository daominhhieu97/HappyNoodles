using HappyNoodles.Models.Dtos;

namespace HappyNoodles.Services.Interfaces
{
    public interface IMenuService
    {
        Task<List<MenuDto>> GetMenus();
    }
}