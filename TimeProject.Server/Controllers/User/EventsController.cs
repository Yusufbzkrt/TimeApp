using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TimeProject.Server.Data;
using TimeProject.Server.Model;
using TimeProject.Server.Model.Dto;

namespace TimeProject.Server.Controllers.User
{
    public class EventsController : ControllerBase
    {
        private readonly TimeProjectDbContext _context;

        public EventsController(TimeProjectDbContext context)
        {
            _context = context;
        }
        public async Task<ActionResult<IEnumerable<Events>>> GetEvents()
        {
            return await _context.Events.Include(e => e.User).ToListAsync();
        }

        [HttpGet("GetEvents")]
        public async Task<ActionResult<Events>> GetEvent()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var createdByUserId = int.Parse(userId);

            var events = await _context.Events
                 .Where(e => e.CreatedByUserID == createdByUserId)
                 .ToListAsync();
            if (events == null || events.Count == 0)
            {
                return NotFound("Etkinlik bulunamadı.");
            }

            return Ok(events);
        }

        [HttpPost("add")]
        public async Task<ActionResult<EventsDto>> PostEvent(EventsDto evntDto)
        {
            var eventEntity = new Events
            {

                EventName = evntDto.EventName,
                Description = evntDto.Description,
                DateTime = evntDto.DateTime,
                CreatedByUserID = evntDto.CreatedByUserID,
            };
            _context.Events.Add(eventEntity);
            await _context.SaveChangesAsync();
            var resultDto = new EventsDto
            {
                EventsId = eventEntity.EventsId,
                EventName = eventEntity.EventName,
                Description = eventEntity.Description,
                DateTime = eventEntity.DateTime,
                CreatedByUserID = eventEntity.CreatedByUserID,
            };

            return CreatedAtAction(nameof(GetEvent), new { id = resultDto.EventsId }, resultDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEvent(int id, Events evnt)
        {
            if (id != evnt.EventsId) return BadRequest();
            _context.Entry(evnt).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            var evnt = await _context.Events.FindAsync(id);
            if (evnt == null) return NotFound();
            _context.Events.Remove(evnt);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
