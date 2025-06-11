using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TimeProject.Server.Data;
using TimeProject.Server.Model.Dto;

namespace TimeProject.Server.Controllers.User
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessageController : ControllerBase
    {
        private readonly TimeProjectDbContext _context;

        public MessageController(TimeProjectDbContext context)
        {
            _context = context;
        }

        // Belirli iki kullanıcı arasındaki mesajları getir
        [HttpGet("{user1Id}/{user2Id}")]
        public async Task<IActionResult> GetConversationMessages(int user1Id, int user2Id)
        {
            var currentUserIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(currentUserIdString, out int currentUserId))
            {
                return Unauthorized("Geçersiz kullanıcı kimliği.");
            }

            // URL'den gelen user1Id ve user2Id'nin, token'daki currentUserId ile eşleştiğini doğrula
            if (currentUserId != user1Id && currentUserId != user2Id)
            {
                return Forbid("Mesajları görme yetkiniz yok.");
            }

            var messages = await _context.Messages
                .Where(m => (m.SenderUserId == user1Id && m.ReceiveUserId == user2Id) ||
                            (m.SenderUserId == user2Id && m.ReceiveUserId == user1Id))
                .OrderBy(m => m.SendAt) // Mesajları gönderilme zamanına göre sırala
                .ToListAsync();

            return Ok(messages);
        }

        [HttpPost]
        public async Task<IActionResult> SendMessage([FromBody] MessageDto messageDto)
        {
            var currentUserIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(currentUserIdString, out int currentUserId))
            {
                return Unauthorized("Geçersiz kullanıcı kimliği.");
            }

            if (currentUserId != messageDto.SenderUserId)
            {
                return Forbid("Başkasının adına mesaj gönderemezsiniz.");
            }

            var message = new Model.Messages
            {
                SenderUserId = messageDto.SenderUserId,
                ReceiveUserId = messageDto.ReceiveUserId,
                MessageContent = messageDto.Text,
                SendAt = DateTime.UtcNow
            };

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            return Ok(message);
        }


        [HttpDelete("{messageId}")]
        public async Task<IActionResult> DeleteMessage(int messageId)
        {
            var currentUserIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(currentUserIdString, out int currentUserId))
            {
                return Unauthorized("Geçersiz kullanıcı kimliği.");
            }

            var messageToDelete = await _context.Messages
                .FirstOrDefaultAsync(m => m.MessagesId == messageId); // messagesId'ye göre arama

            if (messageToDelete == null)
            {
                return NotFound($"ID'si {messageId} olan mesaj bulunamadı.");
            }
            if (messageToDelete.SenderUserId != currentUserId && messageToDelete.ReceiveUserId != currentUserId)
            {
                return Forbid("Bu mesajı silme yetkiniz yok.");
            }

            _context.Messages.Remove(messageToDelete);
            await _context.SaveChangesAsync();

            return NoContent(); // 204 No Content - Başarılı silme
        }
    }
}
