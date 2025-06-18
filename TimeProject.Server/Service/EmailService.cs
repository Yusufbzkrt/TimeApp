using Microsoft.Extensions.Options;
using System.Net.Mail;
using System.Net;
using TimeProject.Server.Model;

namespace TimeProject.Server.Service
{
    public class EmailService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public async Task SendEmailAsync(string to, string subject, string body)
        {
            try
            {
                _logger.LogInformation($"Email gönderme işlemi başladı. Alıcı: {to}, Konu: {subject}");

                var emailSettings = _configuration.GetSection("EmailSettings");
                var smtpServer = emailSettings["SmtpServer"];
                var smtpPort = int.Parse(emailSettings["SmtpPort"]);
                var senderEmail = emailSettings["SenderEmail"];
                var senderName = emailSettings["SenderName"];
                var username = emailSettings["Username"];
                var password = emailSettings["Password"];

                _logger.LogInformation($"SMTP ayarları: Server={smtpServer}, Port={smtpPort}, Sender={senderEmail}");

                using var message = new MailMessage();
                message.From = new MailAddress(senderEmail, senderName);
                message.To.Add(new MailAddress(to));
                message.Subject = subject;
                message.Body = body;
                message.IsBodyHtml = true;

                _logger.LogInformation("Mail mesajı oluşturuldu");

                using var client = new SmtpClient(smtpServer, smtpPort)
                {
                    Credentials = new NetworkCredential(username, password),
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Timeout = 10000 // 10 saniye timeout
                };

                _logger.LogInformation("SMTP client oluşturuldu, email gönderiliyor...");
                await client.SendMailAsync(message);
                _logger.LogInformation($"Email başarıyla gönderildi: {to}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Email gönderilirken hata oluştu: {to}");
                throw new Exception($"Email gönderilemedi: {ex.Message}", ex);
            }
        }
    }
}
