using Azure.Core;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using TimeProject.Server.Data;
using TimeProject.Server.Model;
using TimeProject.Server.Model.Dto;
using MailKit.Net.Smtp;
using MimeKit;
using TimeProject.Server.Helpers;
using MailKit.Security;
using Microsoft.AspNetCore.Identity;
using TimeProject.Server.Service;


namespace TimeProject.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly TimeProjectDbContext _context;
        private readonly EmailService _emailService;
        private readonly ILogger<AuthController> _logger;


        public AuthController(TimeProjectDbContext context, IConfiguration configuration, UserManager<ApplicationUser> userManager, ILogger<AuthController> logger, EmailService emailService)
        {
            _context = context;
            _configuration = configuration;
            _userManager = userManager;
            _logger = logger;
            _emailService = emailService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = "Geçersiz giriş verisi." });
            }
            try
            {
                var existingUser = await _context.User.FirstOrDefaultAsync(u => u.Email == registerDto.Email);
                if (existingUser != null)
                {
                    return BadRequest(new { message = "Bu email adresi zaten kayıtlı." });
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Beklenmeyen hata: " + ex.Message });
            }
          
            var user = new Model.User
            {
                Name = registerDto.FirstName,
                Surname = registerDto.LastName,
                Email = registerDto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password),
                PhoneNumber = registerDto.PhoneNumber,
                RoleId = 2
            };
            await _context.User.AddAsync(user);
            await _context.SaveChangesAsync();
            if (!string.IsNullOrEmpty(registerDto.ServiceName))
            {
                var newService = new Services
                {
                    ServiceName = registerDto.ServiceName,
                    Description = registerDto.Description,
                    CreatedAt = DateTime.UtcNow,
                    UserId = user.UserId
                };
                await _context.User.AddAsync(user);
                await _context.SaveChangesAsync();
            }
            return Ok(new { message = "Kayıt başarılı.", userId = user.UserId });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            try
            {
                var user = await _context.User
                    .FirstOrDefaultAsync(u => u.Email == loginDto.Email);

                if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
                {
                    return Unauthorized(new { message = "Geçersiz kullanıcı adı veya şifre" });
                }

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(_configuration["Token:SecurityKey"]);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Email, loginDto.Email),
            }),
                    Expires = DateTime.UtcNow.AddMinutes(20),
                    Issuer = _configuration["Token:Issuer"],
                    Audience = _configuration["Token:Audience"],
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                if (string.IsNullOrEmpty(tokenString))
                {
                    return Unauthorized(new { message = "Token oluşturulamadı." });
                }

                Console.WriteLine("Generated Token: " + tokenString);

                return Ok(new
                {
                    token = tokenString,
                    userId = user.UserId,       // ✅ userId’yi ekliyoruz
                    name = user.Name,
                    email = user.Email
                });

            }
            catch (Exception ex)
            {
                Console.WriteLine("Error during login: " + ex.Message);
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            try
            {
                _logger.LogInformation($"Şifre sıfırlama isteği başladı. Email: {request.Email}");

                if (string.IsNullOrEmpty(request.Email))
                {
                    _logger.LogWarning("Email adresi boş gönderildi");
                    return BadRequest(new { message = "Email adresi gereklidir." });
                }

                // Users tablosundan kullanıcıyı bul
                var user = await _context.User.FirstOrDefaultAsync(u => u.Email == request.Email);
                _logger.LogInformation($"Kullanıcı bulundu mu: {user != null}");

                if (user == null)
                {
                    _logger.LogWarning($"Kullanıcı bulunamadı: {request.Email}");
                    return Ok(new
                    {
                        message = "Bu email adresi ile kayıtlı bir hesap bulunamadı. Lütfen kayıt olun.",
                        userNotFound = true
                    });
                }

                // Şifre sıfırlama token'ı oluştur
                var token = Guid.NewGuid().ToString();

                // Token'ı veritabanına kaydet
                var resetToken = new Model.Dto.Auth.PasswordResetToken
                {
                    UserId = user.UserId,
                    Token = token,
                    ExpiryDate = DateTime.UtcNow.AddHours(1)
                };

                _context.PasswordResetTokens.Add(resetToken);
                await _context.SaveChangesAsync();

                var frontendUrl = _configuration["FrontendUrl"] ?? "http://localhost:3000";
                var resetLink = $"{frontendUrl}/reset-password?token={Uri.EscapeDataString(token)}&email={Uri.EscapeDataString(user.Email)}";

                var emailBody = $@"
            <h2>Şifre Sıfırlama</h2>
            <p>Merhaba {user.Name},</p>
            <p>Şifrenizi sıfırlamak için aşağıdaki bağlantıya tıklayın:</p>
            <p><a href='{resetLink}'>Şifremi Sıfırla</a></p>
            <p>Bu bağlantı 1 saat süreyle geçerlidir.</p>";

                await _emailService.SendEmailAsync(user.Email, "Şifre Sıfırlama", emailBody);

                return Ok(new { message = "Şifre sıfırlama bağlantısı email adresinize gönderildi." });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Şifre sıfırlama işlemi sırasında beklenmeyen hata");
                return StatusCode(500, new { message = "Şifre sıfırlama işlemi sırasında bir hata oluştu.", details = ex.Message });
            }
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] Model.Dto.Auth.ResetPasswordRequest request)
        {
            try
            {
                _logger.LogInformation($"Şifre sıfırlama isteği alındı. Email: {request.Email}");

                if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Token) || string.IsNullOrEmpty(request.NewPassword))
                {
                    return BadRequest(new { message = "Tüm alanlar gereklidir." });
                }

                // Users tablosundan kullanıcıyı bul
                var user = await _context.User.FirstOrDefaultAsync(u => u.Email == request.Email);
                if (user == null)
                {
                    return BadRequest(new { message = "Geçersiz kullanıcı." });
                }

                // Token'ı kontrol et
                var resetToken = await _context.PasswordResetTokens
                    .FirstOrDefaultAsync(t => t.UserId == user.UserId && t.Token == request.Token && !t.IsUsed);

                if (resetToken == null || resetToken.ExpiryDate < DateTime.UtcNow)
                {
                    return BadRequest(new { message = "Geçersiz veya süresi dolmuş token." });
                }

                // Şifreyi güncelle
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
                resetToken.IsUsed = true;

                await _context.SaveChangesAsync();

                _logger.LogInformation($"Şifre başarıyla güncellendi. Email: {request.Email}");

                return Ok(new { message = "Şifreniz başarıyla güncellendi." });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Şifre sıfırlama işlemi sırasında hata oluştu");
                return StatusCode(500, new { message = "Şifre sıfırlama işlemi sırasında bir hata oluştu.", details = ex.Message });
            }
        }

        [HttpPost("send-email")]
        public async Task SendEmailAsync(string to, string subject, string body)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Time Project", "yazilim.stajyer@haberler.com"));
            message.To.Add(MailboxAddress.Parse(to));
            message.Subject = subject;

            var bodyBuilder = new BodyBuilder { HtmlBody = body };
            message.Body = bodyBuilder.ToMessageBody();

            using (var client = new MailKit.Net.Smtp.SmtpClient())
            {
                await client.ConnectAsync("smtp.example.com", 587, SecureSocketOptions.StartTls);
                await client.AuthenticateAsync("yazilim.stajyer@haberler.com", "Haberler.12");
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }
        }


    }
}
