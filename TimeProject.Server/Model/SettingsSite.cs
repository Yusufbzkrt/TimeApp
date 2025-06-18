using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TimeProject.Server.Model
{
    public class SettingsSite 
    {
        [Key, ForeignKey("User")]
        public int UserId { get; set; }

        public bool Notifications_Email { get; set; } = true;

        public bool Notifications_Push { get; set; } = true;

        public bool Notifications_Sound { get; set; } = true;

        [Required, StringLength(10)]
        public string Language { get; set; } = "tr";

        [Required, StringLength(10)]
        public string FontSize { get; set; } = "medium";

        public bool SoundEnabled { get; set; } = true;

        public bool AutoSave { get; set; } = true;

        [Required, StringLength(10)]
        public string Theme { get; set; } = "light";

        // Navigation property
        public virtual User User { get; set; }
    }
}
