using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using TimeProject.Server.Model;
using TimeProject.Models;

namespace TimeProject.Server.Configurations
{
    public class TaskConfiguration : IEntityTypeConfiguration<TaskModel>
    {
        public void Configure(EntityTypeBuilder<TaskModel> builder)
        {
            builder.HasData(
                new TaskModel { TaskID = 1, TaskName = "Ödev", Description="Ödevi yap", Priority="Normal", Status = "pending", UserId=8 }
            );
        }
    }
}
