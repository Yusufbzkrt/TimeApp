using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TimeProject.Server.Data;
using TimeProject.Server.Model.Dto;

namespace TimeProject.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessagesController : ControllerBase
    {
        private readonly TimeProjectDbContext _context;

        public MessagesController(TimeProjectDbContext context)
        {
            _context = context;
        }

        // Mesaj gönderme
        [HttpPost]
        public async Task<IActionResult> SendMessage([FromBody] SendMessageDto messageDto)
        {
            var message = new Model.Messages
            {
                SenderUserId = messageDto.SenderUserId,
                ReceiveUserId = messageDto.ReceiveUserId,
                MessageContent = messageDto.MessageContent,
                SendAt = DateTime.Now,
                IsRead = false
            };

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            return Ok(message);
        }

        // Kullanıcıların mesajlarını getirme
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetMessages(int userId)
        {
            var messages = await _context.Messages
                .Where(m => m.ReceiveUserId == userId || m.SenderUserId == userId)
                .OrderByDescending(m => m.SendAt)
                .ToListAsync();

            return Ok(messages);
        }
    }

}
