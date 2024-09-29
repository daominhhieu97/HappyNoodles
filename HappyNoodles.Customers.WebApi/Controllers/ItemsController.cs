using HappyNoodles.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HappyNoodles.Customers.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]

    public class ItemsController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetItems()
        {
            var result = new List<GetItemDto>();
            return Ok(result);
        }
    }
}