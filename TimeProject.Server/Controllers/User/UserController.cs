using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TimeProject.Server.Data;
using TimeProject.Server.Model.Dto;

namespace TimeProject.Server.Controllers.User
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly TimeProjectDbContext _context;

        public UserController(TimeProjectDbContext context)
        {
            _context = context;
        }

        [HttpGet("MyContact")]
        public async Task<IActionResult> MyContact()
        {
            try
            {
                // Token'dan userId'yi al
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

                if (userIdClaim == null)
                {
                    return Unauthorized(new { message = "Geçersiz kullanıcı" });
                }

                int userId = int.Parse(userIdClaim.Value);

                // Veritabanından kullanıcıyı al
                var user = await _context.User
                    .Include(u => u.Role)  // Role bilgisi de gerekiyorsa, ekleyebilirsiniz
                    .FirstOrDefaultAsync(u => u.UserId == userId);

                if (user == null)
                {
                    return NotFound(new { message = "Kullanıcı bulunamadı" });
                }

                return Ok(new
                {
                    user.UserId,
                    user.Name,
                    user.Surname,
                    user.Email,
                    user.PhoneNumber,
                    user.ImageUrl,
                    user.Role,
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Sunucu hatası", details = ex.Message });
            }
        }

        [HttpPut("MyContactEdit")]
        public async Task<IActionResult> UpdateContact([FromForm] UserUpdateRequest userUpdateRequest)
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

                if (userIdClaim == null)
                {
                    return Unauthorized(new { message = "Geçersiz kullanıcı" });
                }

                int userId = int.Parse(userIdClaim.Value);

                var user = await _context.User
                    .FirstOrDefaultAsync(u => u.UserId == userId);

                if (user == null)
                {
                    return NotFound(new { message = "Kullanıcı bulunamadı" });
                }

                user.Name = userUpdateRequest.Name ?? user.Name;
                user.Surname = userUpdateRequest.Surname ?? user.Surname;
                user.Email = userUpdateRequest.Email ?? user.Email;
                user.PhoneNumber = userUpdateRequest.PhoneNumber ?? user.PhoneNumber;

                if (userUpdateRequest.ImageUrl != null)
                {
                    var image = userUpdateRequest.ImageUrl;
                    var uploadDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
                    if (!Directory.Exists(uploadDirectory))
                        Directory.CreateDirectory(uploadDirectory);

                    var fileName = Path.GetFileName(image.FileName);
                    var filePath = Path.Combine(uploadDirectory, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await image.CopyToAsync(stream);
                    }

                    user.ImageUrl = "/images/" + fileName;
                }


                _context.User.Update(user);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Bilgiler başarıyla güncellendi!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Sunucu hatası", details = ex.Message });
            }
        }

    }

}

