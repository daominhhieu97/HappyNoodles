using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
[Authorize]

public class FoodController : ControllerBase
{
    [HttpGet("foods")]
    public IActionResult GetFoods()
    {
        // Example secure resource
        var user = User.Identity?.Name ?? "Unknown";
        return Ok($"Hello, {user}! this is food");
    }
}