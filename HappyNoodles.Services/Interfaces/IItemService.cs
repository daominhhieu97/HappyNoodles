using HappyNoodles.Models.Dtos;

namespace HappyNoodles.Services.Interfaces;

public interface IItemService
{
    Task<ItemDetailsDto> GetProductDetails(Guid id);
}