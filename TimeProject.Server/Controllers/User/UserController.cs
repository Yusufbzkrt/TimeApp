﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nest;
using System.Security.Claims;
using TimeProject.Server.Data;
using TimeProject.Server.Model;
using TimeProject.Server.Model.Dto;

namespace TimeProject.Server.Controllers.User
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly TimeProjectDbContext _context;
        private readonly ILogger<UserController> _logger;

        public UserController(TimeProjectDbContext context, ILogger<UserController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var currentUserIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(currentUserIdString, out int currentUserId))
            {
                return Unauthorized("Geçersiz kullanıcı kimliği.");
            }

            var users = await _context.User
                                    .Where(u => u.UserId != currentUserId)
                                    .ToListAsync();

            var userListDtos = new List<UserListDto>();

            foreach (var user in users)
            {
                var lastMessage = await _context.Messages
                                                .Where(m => (m.SenderUserId == currentUserId && m.ReceiveUserId == user.UserId) ||
                                                            (m.SenderUserId == user.UserId && m.ReceiveUserId == currentUserId))
                                                .OrderByDescending(m => m.SendAt) // En yeni mesaj en başta olacak
                                                .FirstOrDefaultAsync(); // Sadece en yeni mesajı al

                string? formattedTimestamp = null;
                if (lastMessage != null) // Eğer bir mesaj bulunduysa
                {
                    formattedTimestamp = lastMessage.SendAt.ToString("yyyy-MM-dd HH:mm");
                }

                userListDtos.Add(new UserListDto
                {
                    UserId = user.UserId,
                    Name = user.Name,
                    avatar = user.avatar,
                    Email = user.Email,
                    LastMessageContent = lastMessage?.MessageContent, // Eğer mesaj yoksa null olacak
                    LastMessageTimestamp = formattedTimestamp // Formatlanmış tarih string'i
                });
            }

            return Ok(userListDtos); // Hazırladığımız DTO listesini geri döndürüyoruz
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
                    user.Credit,
                    user.avatar,
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

                    user.avatar = "/images/" + fileName;
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

        //blog oluştur
        [HttpPost("BlogAdd")]
        public async Task<IActionResult> BlogAdd([FromForm] BlogAddDto newPost)
        {
            try
            {
                string? imagePath = null;

                if (newPost.ImageUrl != null)
                {
                    var fileName = Guid.NewGuid() + Path.GetExtension(newPost.ImageUrl.FileName);
                    var filePath = Path.Combine("wwwroot", "images", fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await newPost.ImageUrl.CopyToAsync(stream);
                    }

                    imagePath = $"/images/{fileName}";
                }

                var blog = new Blog
                {
                    Title = newPost.Title,
                    Content = newPost.Content,
                    ImageUrl = imagePath,
                    Date = DateTime.Now
                };

                _context.Blog.Add(blog);
                await _context.SaveChangesAsync();

                return Ok(blog);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Blog eklenirken hata oluştu", details = ex.Message });
            }
        }


        // Tüm blogları getir
        [HttpGet("GetBlog")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var blogs = await _context.Blog
                    .OrderByDescending(b => b.Date)
                    .ToListAsync();

                return Ok(blogs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Bloglar alınamadı", details = ex.Message });
            }
        }

        [HttpDelete("BlogDelete/{blogId}")]
        public async Task<IActionResult> DeleteBlog(int blogId)
        {
            var blog = await _context.Blog.FindAsync(blogId);
            if (blog == null)
            {
                return NotFound(new { message = "Blog bulunamadı." }); // Hata mesajı döner
            }

            _context.Blog.Remove(blog);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Blog başarıyla silindi." }); // Başarılı mesaj döner
        }

        [HttpGet("GetBlog/{BlogId}")]
        public async Task<IActionResult> GetBlog(int BlogId)
        {
            var blog = _context.Blog.FirstOrDefault(b => b.BlogId == BlogId);
            if (blog == null)
                return NotFound(); 
            
            return Ok(blog);
        }

        [HttpPut("MyBlogEdit/{BlogId}")]
        public async Task<IActionResult> MyBlogEdit(int BlogId, [FromForm] BlogUpdateDto updatedBlog)
        {
            if (BlogId != updatedBlog.BlogId)
            {
                return BadRequest("Blog ID'leri eşleşmiyor.");
            }

            var blog = await _context.Blog.FindAsync(BlogId);
            if (blog == null)
            {
                return NotFound("Blog bulunamadı.");
            }

            blog.Title = updatedBlog.Title;
            blog.Content = updatedBlog.Content;

            if (updatedBlog.ImageUrl != null)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(updatedBlog.ImageUrl.FileName)}";
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await updatedBlog.ImageUrl.CopyToAsync(stream);
                }

                blog.ImageUrl = $"/images/{fileName}";
            }

            _context.Blog.Update(blog);
            await _context.SaveChangesAsync();

            return Ok("Blog başarıyla güncellendi.");
        }

        [HttpGet("credit")]
        public async Task<ActionResult<UserCreditDto>> GetUserCredit()
        {
            try
            {
                // Kullanıcı ID'sini al
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("Kullanıcı kimliği bulunamadı.");
                }

                // Kullanıcıyı veritabanından bul
                var user = await _context.User
                    .FirstOrDefaultAsync(u => u.UserId == int.Parse(userId));

                if (user == null)
                {
                    return NotFound("Kullanıcı bulunamadı.");
                }

                // Kredi bilgisini döndür
                return Ok(new UserCreditDto
                {
                    Credit = user.Credit
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Kullanıcı kredisi alınırken hata oluştu.");
                return StatusCode(500, "Kredi bilgisi alınırken bir hata oluştu.");
            }
        }

    }

}

