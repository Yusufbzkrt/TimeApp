using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using BCrypt.Net;
namespace TimeProject.Server.Model.Configuration
{
    // Şifre hashleme için

    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            // User konfigürasyonu
            builder.HasKey(u => u.UserId);
            builder.Property(u => u.Name).IsRequired().HasMaxLength(100);
            builder.Property(u => u.Surname).IsRequired().HasMaxLength(100);
            builder.Property(u => u.Email).IsRequired().HasMaxLength(255);
            builder.Property(u => u.PhoneNumber).HasMaxLength(15);
            builder.Property(u => u.avatar).HasMaxLength(500);
            builder.Property(u => u.AccountStatusId).HasMaxLength(50);

            // Admin kullanıcısını ekleyelim
            var passwordHash = BCrypt.HashPassword("1212");

            builder.HasData(
                new User
                {
                    UserId = 1,
                    Name = "Yusuf",
                    Surname = "Bozkurt",
                    Email = "admin@example.com",
                    PasswordHash = passwordHash,
                    PhoneNumber = "1234567890",
                    avatar = "/images/mona.jpg",
                    RoleId = 1, // Admin rolü
                    TestResult = false,
                    AccountStatusId = "Active",
                    CreateDate = DateTime.Now
                },
                 new User
                 {
                     UserId = 2,
                     Name = "Mehmet",
                     Surname = "Ali",
                     Email = "mehmet@example.com",
                     PasswordHash = passwordHash,
                     PhoneNumber = "05537668452",
                     RoleId = 2, // Admin rolü
                     TestResult = false,
                     AccountStatusId = "Active",
                     CreateDate = DateTime.Now
                 },
                 new User
                 {
                     UserId = 3,
                     Name = "ahmet",
                     Surname = "can",
                     Email = "ahmet@example.com",
                     PasswordHash = passwordHash,
                     PhoneNumber = "05528445566",
                     RoleId = 2, // Admin rolü
                     TestResult = false,
                     AccountStatusId = "Active",
                     CreateDate = DateTime.Now
                 }
            );
        }
    }
}
