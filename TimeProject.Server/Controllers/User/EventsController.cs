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
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "Geçersiz kullanıcı" });
            }
            var createdByUserId = int.Parse(userIdClaim.Value);

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
        public async Task<ActionResult<EventsDto>> PostEvent([FromForm] EventsDto evntDto)
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

                if (userIdClaim == null)
                {
                    return Unauthorized(new { message = "Geçersiz kullanıcı" });
                }
                int userId = int.Parse(userIdClaim.Value);

                string imagePath = null;
                if (evntDto.Image != null)
                {
                    var fileName = Guid.NewGuid() + Path.GetExtension(evntDto.Image.FileName);
                    var filePath = Path.Combine("wwwroot", "images", fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await evntDto.Image.CopyToAsync(stream);
                    }

                    imagePath = $"/images/{fileName}";
                }
                var eventEntity = new Events
                {
                    EventName = evntDto.EventName,
                    Description = evntDto.Description,
                    DateTime = evntDto.DateTime,
                    Location = evntDto.Location,
                    Capacity = evntDto.Capacity,
                    Credit = evntDto.Credit,
                    CreatedByUserID = userId,
                    Image = imagePath,
                    IsActive = true
                };
                _context.Events.Add(eventEntity);
                await _context.SaveChangesAsync();
                var resultDto = new EventsDto
                {
                    EventsId = eventEntity.EventsId,
                    EventName = eventEntity.EventName,
                    Description = eventEntity.Description,
                    DateTime = eventEntity.DateTime,
                    Location = eventEntity.Location,
                    Capacity = eventEntity.Capacity,
                    Credit = eventEntity.Credit,

                };

                return Ok(resultDto);
            }
            catch (Exception ex)
            {
                // Hatanın sebebini görmek için logla
                Console.WriteLine("Etkinlik ekleme hatası: " + ex.Message);
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        [HttpGet("{eventsId}")]
        public async Task<IActionResult> GetEvent(int eventsId)
        {
            var evnt = await _context.Events.FindAsync(eventsId);
            if (evnt == null)
            {
                return NotFound(new { errorText = "Etkinlik bulunamadı." });
            }

            return Ok(evnt);
        }


        [HttpPut("{eventsId}")]
        public async Task<IActionResult> PutEvent(int eventsId, [FromForm] EventsDto evntDto)
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
            evnt.Location = evntDto.Location;
            evnt.Capacity = evntDto.Capacity;
            evnt.Credit = evntDto.Credit;


            if (evntDto.Image != null)
            {
                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(evntDto.Image.FileName)}";
                var filePath = Path.Combine("wwwroot/images", fileName);


                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await evntDto.Image.CopyToAsync(stream);
                }

                evnt.Image = $"/images/{fileName}";
            }

            try
            {
                _context.Entry(evnt).State = EntityState.Modified;
                var result = await _context.SaveChangesAsync();
                if (result > 0)
                    return Ok(new { message = "Etkinlik başarıyla güncellendi." });
                else
                    return StatusCode(500, new { errorText = "Veritabanı güncellenmedi." });
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
