using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class HomeController : ControllerBase {
    public async Task<IActionResult> Index() {
        return Ok("hello");
    }
}