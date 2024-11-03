using AutoMapper;
using HappyNoodles.Models.Dtos;
using HappyNoodles.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HappyNoodles.Services.Services
{
    public class MenuService : IMenuService
    {
        private readonly HappyNoodlesContext _happyNoodlesContext;
        private readonly IMapper _mapper;

        public MenuService(HappyNoodlesContext happyNoodlesContext, IMapper mapper)
        {
            _happyNoodlesContext = happyNoodlesContext;
            _mapper = mapper;
        }

        public async Task<List<MenuDto>> GetMenus()
        {
            var menus = await _happyNoodlesContext.Menus
            .Include(m => m.Categories)
            .ThenInclude(m => m.Items)
            .ToListAsync();

            return _mapper.Map<List<MenuDto>>(menus);
        }
    }
}
