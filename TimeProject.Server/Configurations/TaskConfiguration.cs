using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using TimeProject.Server.Model;
using TimeProject.Models;

namespace TimeProject.Server.Configurations
{
    public class TaskConfiguration : IEntityTypeConfiguration<Models.Tasks>
    {
        public void Configure(EntityTypeBuilder<Models.Tasks> builder)
        {
            builder.HasData(
                new Tasks { TaskID = 1, TaskName = "Ödev", Description="Ödevi yap", Priority="Normal", Status = "pending", UserId=8 }
            );
        }
    }
}
