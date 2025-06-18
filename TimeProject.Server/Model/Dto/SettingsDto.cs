namespace TimeProject.Server.Model.Dto
{
    public class SettingsDto
    {
        public class UserSettings
        {
            public NotificationSettings Notifications { get; set; } = new();
            public string Language { get; set; } = "tr";
            public string FontSize { get; set; } = "medium";
            public bool SoundEnabled { get; set; } = true;
            public bool AutoSave { get; set; } = true;
            public string Theme { get; set; } = "light";
        }

        public class NotificationSettings
        {
            public bool Email { get; set; } = true;
            public bool Push { get; set; } = true;
            public bool Sound { get; set; } = true;
        }
    }
}
