// Controllers/SettingsController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TimeProject.Server.Model.Dto;
using TimeProject.Server.Service;

namespace TimeProject.Server.Controllers.User
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class SettingsController : ControllerBase
    {
        private readonly SettingsService _settingsService;
        private readonly ILogger<SettingsController> _logger;

        public SettingsController(SettingsService settingsService, ILogger<SettingsController> logger)
        {
            _settingsService = settingsService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<SettingsDto.UserSettings>> GetSettings()
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                if (userIdClaim == null)
                {
                    return Unauthorized("Kullanıcı kimliği bulunamadı");
                }

                if (!int.TryParse(userIdClaim.Value, out int userId))
                {
                    return BadRequest("Geçersiz kullanıcı kimliği");
                }

                var settings = await _settingsService.GetUserSettingsAsync(userId);
                return Ok(settings);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ayarlar getirilirken hata oluştu");
                return StatusCode(500, new { message = "Ayarlar getirilirken bir hata oluştu", error = ex.Message });
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateSettings([FromBody] SettingsDto.UserSettings settings)
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                if (userIdClaim == null)
                {
                    return Unauthorized("Kullanıcı kimliği bulunamadı");
                }

                if (!int.TryParse(userIdClaim.Value, out int userId))
                {
                    return BadRequest("Geçersiz kullanıcı kimliği");
                }

                await _settingsService.UpdateUserSettingsAsync(userId, settings);
                return Ok(new { message = "Ayarlar başarıyla güncellendi" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ayarlar güncellenirken hata oluştu");
                return StatusCode(500, new { message = "Ayarlar güncellenirken bir hata oluştu", error = ex.Message });
            }
        }
    }
}