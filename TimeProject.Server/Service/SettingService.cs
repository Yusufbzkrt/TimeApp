// Service/SettingsService.cs
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TimeProject.Server.Data;
using TimeProject.Server.Model;
using TimeProject.Server.Model.Dto;

namespace TimeProject.Server.Service
{
    public class SettingsService
    {
        private readonly TimeProjectDbContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<SettingsService> _logger;

        public SettingsService(TimeProjectDbContext context, IMapper mapper, ILogger<SettingsService> logger)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<SettingsDto.UserSettings> GetUserSettingsAsync(int userId)
        {
            try
            {
                var userSettings = await _context.SettingsSites
                    .FirstOrDefaultAsync(s => s.UserId == userId);

                if (userSettings == null)
                {
                    _logger.LogInformation($"Kullanıcı {userId} için varsayılan ayarlar oluşturuluyor");
                    // Varsayılan ayarları döndür
                    return new SettingsDto.UserSettings
                    {
                        Notifications = new SettingsDto.NotificationSettings
                        {
                            Email = true,
                            Push = true,
                            Sound = true
                        },
                        Language = "tr",
                        FontSize = "medium",
                        SoundEnabled = true,
                        AutoSave = true,
                        Theme = "light"
                    };
                }

                return _mapper.Map<SettingsDto.UserSettings>(userSettings);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Kullanıcı {userId} için ayarlar getirilirken hata oluştu");
                throw;
            }
        }

        public async Task UpdateUserSettingsAsync(int userId, SettingsDto.UserSettings settings)
        {
            try
            {
                var userSettings = await _context.SettingsSites
                    .FirstOrDefaultAsync(s => s.UserId == userId);

                if (userSettings == null)
                {
                    _logger.LogInformation($"Kullanıcı {userId} için yeni ayarlar oluşturuluyor");
                    userSettings = new SettingsSite { UserId = userId };
                    _context.SettingsSites.Add(userSettings);
                }

                _mapper.Map(settings, userSettings);
                await _context.SaveChangesAsync();
                _logger.LogInformation($"Kullanıcı {userId} için ayarlar güncellendi");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Kullanıcı {userId} için ayarlar güncellenirken hata oluştu");
                throw;
            }
        }
    }
}