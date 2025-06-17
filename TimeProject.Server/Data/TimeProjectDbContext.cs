using Microsoft.EntityFrameworkCore;
using TimeProject.Models;
using TimeProject.Server.Configurations;
using TimeProject.Server.Model;
using TimeProject.Server.Model.Configuration;

namespace TimeProject.Server.Data
{
    public class TimeProjectDbContext : DbContext
    {
        public TimeProjectDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Credits> Credits { get; set; }
        public DbSet<Events> Events { get; set; }
        public DbSet<Messages> Messages { get; set; }
        public DbSet<Notifications> Notifications { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Services> Services { get; set; }
        public DbSet<Transactions> Transactions { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Blog> Blog { get; set; }
        public DbSet<Tasks> Tasks { get; set; }
        public DbSet<EventParticipant> EventParticipants { get; set; }
        public DbSet<EmailSettings> EmailSettings { get; set; }
        public DbSet<Document> Documents { get; set; } 


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User ve Services ilişkisi
            modelBuilder.Entity<User>()
                .HasMany(u => u.UserServices)
                .WithOne(s => s.User)
                .HasForeignKey(s => s.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Events>()
                .HasOne(e => e.User)
                .WithMany(u => u.Events)
                .HasForeignKey(e => e.CreatedByUserID);

            modelBuilder.Entity<Tasks>()
    .HasOne(t => t.User)
    .WithMany() 
    .HasForeignKey(t => t.UserId)
    .OnDelete(DeleteBehavior.Cascade);




            modelBuilder.ApplyConfiguration(new RoleConfiguration());
            modelBuilder.ApplyConfiguration(new UserConfiguration());
           // modelBuilder.ApplyConfiguration(new TaskConfiguration());
        }
    }
}