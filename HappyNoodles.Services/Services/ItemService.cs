using AutoMapper;
using HappyNoodles.Models.Dtos;
using HappyNoodles.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HappyNoodles.Services.Services
{
    public class ItemService : IItemService
    {

        private readonly HappyNoodlesContext _happyNoodlesContext;
        private readonly IMapper _mapper;

        public ItemService(HappyNoodlesContext happyNoodlesContext, IMapper mapper)
        {
            _happyNoodlesContext = happyNoodlesContext;
            _mapper = mapper;
        }

        public async Task<ItemDetailsDto> GetProductDetails(Guid id)
        {
            var item = await _happyNoodlesContext.Items
            .Include(i => i.Category)
            .FirstOrDefaultAsync(i => i.Id == id);

            if (item == null) throw new Exception("Cannot found any item");

            var itemDetailsDto = _mapper.Map<ItemDetailsDto>(item);

            return itemDetailsDto;
        }
    }
}
