using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Security.Claims;
using TimeProject.Models;
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
        private readonly ILogger<EventParticipantController> _logger;

        public EventParticipantController(TimeProjectDbContext context, ILogger<EventParticipantController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost("join")]
        public async Task<IActionResult> JoinEvent([FromBody] EventParticipantDto request)
        {
            try
            {
                // Kullanıcı ID'sini al
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("Kullanıcı kimliği bulunamadı.");
                }

                // Kullanıcıyı bul
                var user = await _context.User.FindAsync(int.Parse(userId));
                if (user == null)
                {
                    return NotFound("Kullanıcı bulunamadı.");
                }

                // Etkinliği bul
                var @event = await _context.Events.FindAsync(request.EventId);
                var creatorUserId = @event.CreatedByUserID;

                if (@event == null)
                {
                    return NotFound("Etkinlik bulunamadı.");
                }

                // Etkinlik kapasitesini kontrol et
                var currentParticipants = await _context.EventParticipants
                    .CountAsync(ep => ep.EventId == request.EventId);

                if (currentParticipants >= @event.Capacity)
                {
                    return BadRequest("Etkinlik kapasitesi dolu.");
                }

                // Kullanıcının daha önce kaydolup olmadığını kontrol et
                var existingParticipation = await _context.EventParticipants
                    .AnyAsync(ep => ep.EventId == request.EventId && ep.Id == user.UserId);

                if (existingParticipation)
                {
                    return BadRequest("Bu etkinliğe zaten kayıtlısınız.");
                }

                // Kullanıcının yeterli kredisi var mı kontrol et
                if (user.Credit < @event.Credit)
                {
                    return BadRequest($"Yeterli krediniz bulunmamaktadır. Gereken: {@event.Credit}, Mevcut: {user.Credit}");
                }

                // Krediyi düş
                user.Credit -= @event.Credit;
                var creatorUser = await _context.User.FindAsync(creatorUserId);
                if (creatorUser != null)
                {
                    creatorUser.Credit += @event.Credit;
                }

                // Katılımı kaydet
                var participant = new EventParticipant
                {
                    EventId = request.EventId,
                    UserId = user.UserId,
                    JoinedAt = DateTime.UtcNow
                };

                _context.EventParticipants.Add(participant);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Etkinliğe başarıyla katıldınız.", remainingCredit = user.Credit });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Etkinliğe katılırken hata oluştu");
                return StatusCode(500, "Etkinliğe katılırken bir hata oluştu.");
            }
        }
    }
}