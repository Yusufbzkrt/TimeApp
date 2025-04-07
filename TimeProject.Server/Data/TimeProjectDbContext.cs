using Microsoft.EntityFrameworkCore;
using TimeProject.Server.Model;

namespace TimeProject.Server.Data
{
    public class TimeProjectDbContext : DbContext
    {
        public TimeProjectDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<AccountStatus> AccountStatuses { get; set; }
        public DbSet<Credits> Credits { get; set; }
        public DbSet<Events> Events { get; set; }
        public DbSet<Messages> Messages { get; set; }
        public DbSet<Notifications> Notifications { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Services> Services { get; set; }
        public DbSet<Transactions> Transactions { get; set; }
        public DbSet<User> User { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User ve Services ilişkisi
            modelBuilder.Entity<User>()
                .HasMany(u => u.UserServices)
                .WithOne(s => s.User)
                .HasForeignKey(s => s.UserId)
                .OnDelete(DeleteBehavior.Cascade); 
        }
    }
}