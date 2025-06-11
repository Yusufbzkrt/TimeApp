using Microsoft.AspNetCore.Mvc;
using TimeProject.Server.Data;
using TimeProject.Server.Model;
using TimeProject.Server.Model.Dto;

namespace TimeProject.Server.Controllers.HomePage
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventParticipantController : ControllerBase
    {
        private readonly TimeProjectDbContext _context;

        public EventParticipantController(TimeProjectDbContext context)
        {
            _context = context;
        }

        [HttpPost("join")]
        public async Task<IActionResult> JoinEvent([FromBody] EventParticipantDto dto)
        {
            var participant = new EventParticipant
            {
                EventId = dto.EventId,
                Name = dto.Name,
                Email = dto.Email,
                JoinedAt = DateTime.Now
            };

            _context.EventParticipants.Add(participant);

            var eventEntity = await _context.Events.FindAsync(dto.EventId);
            if(eventEntity == null)
            {
                return NotFound("Etkinlik bulunamadı");
            }
            eventEntity.CurrentParticipants+=1;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Katılım başarılı!" });
        }

    }

}
