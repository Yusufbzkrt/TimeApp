using AutoMapper;
using TimeProject.Server.Model;
using TimeProject.Server.Model.Dto;

namespace TimeProject.Server.Mappings
{
    public class SettingsProfile : Profile  // Profile sınıfından kalıtım alıyoruz
    {
        public SettingsProfile()
        {
            CreateMap<SettingsSite, SettingsDto.UserSettings>()
                .ForMember(dest => dest.Notifications, opt => opt.MapFrom(src => new SettingsDto.NotificationSettings
                {
                    Email = src.Notifications_Email,
                    Push = src.Notifications_Push,
                    Sound = src.Notifications_Sound
                }));

            CreateMap<SettingsDto.UserSettings, SettingsSite>()
                .ForMember(dest => dest.Notifications_Email, opt => opt.MapFrom(src => src.Notifications.Email))
                .ForMember(dest => dest.Notifications_Push, opt => opt.MapFrom(src => src.Notifications.Push))
                .ForMember(dest => dest.Notifications_Sound, opt => opt.MapFrom(src => src.Notifications.Sound));
        }
    }
}