using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class OrderController : ControllerBase
{
    private readonly IOrderService _orderService;
    private readonly IMapper _mapper;

    public OrderController(IOrderService orderService, IMapper mapper)
    {
        _orderService = orderService;
        _mapper = mapper;
    }

    [HttpPost("saveorder")]
    public async Task<IActionResult> SaveOrder([FromBody] OrderDto orderDto)
    {
        var result = await _orderService.SaveOrderAsync(orderDto);
        return Ok(result);
    }

    [HttpGet("getorders")]
    public async Task<IActionResult> GetOrders()
    {
        var orders = await _orderService.GetOrdersAsync();
        var orderSummaries = _mapper.Map<List<OrderSummaryDto>>(orders);
        return Ok(orderSummaries);
    }

    [HttpGet("getorderdetails/{id}")]
    public async Task<IActionResult> GetOrderDetails(Guid id)
    {
        var order = await _orderService.GetOrderDetailsAsync(id);
        if (order == null)
        {
            return NotFound();
        }
        var orderDetails = _mapper.Map<OrderDetailDto>(order);
        return Ok(orderDetails);
    }
}