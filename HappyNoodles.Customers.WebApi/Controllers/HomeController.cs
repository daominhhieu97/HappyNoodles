using Microsoft.AspNetCore.Mvc;
[Controller]
public class HomeController : ControllerBase {
    public async Task<IActionResult> Index() {
        return Ok("hello");
    }
}