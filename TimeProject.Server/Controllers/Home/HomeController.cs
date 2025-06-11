using Microsoft.AspNetCore.Mvc;

namespace TimeProject.Server.Controllers.Home
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
