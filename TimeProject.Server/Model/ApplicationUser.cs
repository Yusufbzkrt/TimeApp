using Microsoft.AspNetCore.Identity;

namespace TimeProject.Server.Model
{
    public class ApplicationUser : IdentityUser
    {
        // Ek özellikler buraya eklenebilir
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public bool IsActive { get; set; } = true;
    }
}
