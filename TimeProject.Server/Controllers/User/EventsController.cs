using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TimeProject.Server.Data;
using TimeProject.Server.Model;
using TimeProject.Server.Model.Dto;

namespace TimeProject.Server.Controllers.User
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly TimeProjectDbContext _context;

        public EventsController(TimeProjectDbContext context)
        {
            _context = context;
        }

        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Events>>> GetEvents()
        {
            return await _context.Events.Include(e => e.User).ToListAsync();
        }

        [HttpGet("GetEvents")]
        public async Task<ActionResult<IEnumerable<Events>>> GetEventsForUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized("Kullanıcı kimliği doğrulanamadı.");
            }
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

            return Ok(resultDto);
        }

        [HttpPut("{eventsId}")]
        public async Task<IActionResult> PutEvent(int eventsId, EventsDto evntDto)
        {
            // Etkinlik var mı kontrol et
            var evnt = await _context.Events.FindAsync(eventsId);
            if (evnt == null)
            {
                return NotFound(new { errorText = "Etkinlik bulunamadı." });
            }

            // Etkinlik verilerini güncelle
            evnt.EventName = evntDto.EventName;
            evnt.Description = evntDto.Description;
            evnt.DateTime = evntDto.DateTime;

            try
            {
                // Veritabanı kaydını güncelle
                _context.Entry(evnt).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return Ok(new { message = "Etkinlik başarıyla güncellendi." });
            }
            catch (Exception)
            {
                return StatusCode(500, new { errorText = "Etkinlik güncellenirken bir hata oluştu." });
            }
        }


        [HttpDelete("{eventsId}")]
        public async Task<IActionResult> DeleteEvent(int eventsId)
        {
            var evnt = await _context.Events.FindAsync(eventsId);
            if (evnt == null) return NotFound();
            _context.Events.Remove(evnt);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Etkinlik başarıyla silindi." });
        }
    }
}
