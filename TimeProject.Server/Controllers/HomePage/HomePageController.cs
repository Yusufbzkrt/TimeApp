using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TimeProject.Server.Data;
using TimeProject.Server.Model;
using TimeProject.Server.Model.Dto;

namespace TimeProject.Server.Controllers.HomePage
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomePageController : ControllerBase
    {
        private readonly TimeProjectDbContext _context;

        public HomePageController(TimeProjectDbContext context)
        {
            _context=context;
        }

        [HttpGet("allEvents")]
        public async Task<ActionResult<List<Events>>> GetAllEvents()
        {
            var events = await _context.Events
                .OrderBy(e => e.DateTime)
                .ToListAsync();

            return Ok(events);
        }
        [HttpGet("event/{id}")]
        public async Task<IActionResult> GetEventById(int id)
        {
            var ev = await _context.Events.FindAsync(id);

            if (ev == null)
                return NotFound(new { message = "Etkinlik bulunamadı" });

            return Ok(ev);
        }


    }
}
