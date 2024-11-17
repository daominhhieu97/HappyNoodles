using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class OrderController : ControllerBase
{
    private readonly IOrderService _orderService;

    public OrderController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpPost("saveorder")]
    public async Task<IActionResult> SaveOrder([FromBody] OrderDto orderDto)
    {
        var result = await _orderService.SaveOrderAsync(orderDto);
        return Ok(result);
    }
}