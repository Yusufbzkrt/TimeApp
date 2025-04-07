using Azure.Core;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TimeProject.Server.Data;
using TimeProject.Server.Model;
using TimeProject.Server.Model.Dto;

namespace TimeProject.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly TimeProjectDbContext _context;

        public AuthController(TimeProjectDbContext context)
        {
            _context = context;
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

            var user = new User
            {
                Name = registerDto.Name,
                Surname = registerDto.Surname,
                Email = registerDto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password),
                PhoneNumber = registerDto.PhoneNumber
            };
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

        [HttpGet]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var user = await _context.User.FirstOrDefaultAsync(u => u.Email == loginDto.Email);
            if (user == null)
            {
                return Unauthorized(new { message = "Geçersiz kullanıcı adı veya Şifre" });
            }
            return Ok();
        }

        

    }
}
