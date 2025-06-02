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


namespace TimeProject.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly TimeProjectDbContext _context;

        public AuthController(TimeProjectDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = "Geçersiz giriş verisi." });
            }

            var existingUser = await _context.User.FirstOrDefaultAsync(u => u.Email == registerDto.Email);
            if (existingUser != null)
            {
                return BadRequest(new { message = "Bu email adresi zaten kayıtlı." });
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
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto dto)
        {
            var user = await _context.User.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null)
            {
                return Ok(new { message = "Şifre sıfırlama linki e-posta adresinize gönderildi." });
            }

            var token = Guid.NewGuid().ToString();

            user.PasswordResetToken = token;
            user.PasswordResetTokenExpires = DateTime.UtcNow.AddHours(1);

            await _context.SaveChangesAsync();

            var resetLink = $"https://senin-site-adresin.com/reset-password?email={user.Email}&token={token}";
            await SendEmailAsync(user.Email, "Şifre Sıfırlama", $"Şifrenizi yenilemek için tıklayın: {resetLink}");

            return Ok(new { message = "Şifre sıfırlama linki e-posta adresinize gönderildi." });
        }


        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto dto)
        {
            var user = await _context.User.FirstOrDefaultAsync(u =>
                u.Email == dto.Email &&
                u.PasswordResetToken == dto.Token &&
                u.PasswordResetTokenExpires > DateTime.UtcNow);

            if (user == null)
                return BadRequest(new { message = "Geçersiz veya süresi dolmuş token." });

            // Şifreyi hash'leyip kaydet
            user.PasswordHash = PasswordHelper.HashPassword(dto.NewPassword);
            user.PasswordResetToken = null;
            user.PasswordResetTokenExpires = null;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Şifre başarıyla yenilendi." });
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
