using Microsoft.AspNetCore.Mvc;
using TimeProject.Server.Service;

namespace TimeProject.Server.Controllers.User
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly EmailService _emailService;
        private readonly IConfiguration _configuration;

        public ContactController(EmailService emailService, IConfiguration configuration)
        {
            _emailService = emailService;
            _configuration = configuration;
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendContactForm([FromBody] ContactDto contact)
        {
            if (string.IsNullOrWhiteSpace(contact.Email) ||
                string.IsNullOrWhiteSpace(contact.Message))
            {
                return BadRequest("Eksik bilgi girdiniz.");
            }

            var adminEmail = _configuration["AdminEmail"]; // appsettings'den admin maili al

            var subject = $"Yeni İletişim Formu Mesajı - {contact.Name}";
            var body = $@"
            <h3>Yeni mesajınız var</h3>
            <p><strong>Gönderen:</strong> {contact.Name} ({contact.Email})</p>
            <p><strong>Mesaj:</strong></p>
            <p>{contact.Message}</p>
        ";

            await _emailService.SendEmailAsync(adminEmail, subject, body);

            return Ok("Mesajınız başarıyla gönderildi.");
        }
    }

    public class ContactDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Message { get; set; }
    }
}
