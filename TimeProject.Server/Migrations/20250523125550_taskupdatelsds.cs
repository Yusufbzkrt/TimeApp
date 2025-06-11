using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class taskupdatelsds : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TaskModel");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 23, 15, 55, 50, 173, DateTimeKind.Local).AddTicks(2161), "$2a$11$EXYvTDV6DSNJE5qJgSvmJereMIYFPhQyDUYgcoCRTyZ8nRrBIQRA." });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 23, 15, 55, 50, 173, DateTimeKind.Local).AddTicks(2187), "$2a$11$EXYvTDV6DSNJE5qJgSvmJereMIYFPhQyDUYgcoCRTyZ8nRrBIQRA." });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 23, 15, 55, 50, 173, DateTimeKind.Local).AddTicks(2189), "$2a$11$EXYvTDV6DSNJE5qJgSvmJereMIYFPhQyDUYgcoCRTyZ8nRrBIQRA." });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TaskModel",
                columns: table => new
                {
                    TaskID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    DueDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Priority = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    TaskName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskModel", x => x.TaskID);
                    table.ForeignKey(
                        name: "FK_TaskModel_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "TaskModel",
                columns: new[] { "TaskID", "CreatedDate", "Description", "DueDate", "Priority", "Status", "TaskName", "UpdatedDate", "UserId" },
                values: new object[] { 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Ödevi yap", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Normal", "pending", "Ödev", null, 8 });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 23, 15, 54, 0, 102, DateTimeKind.Local).AddTicks(8131), "$2a$11$lsPGLPj6eABAX4ep2ysrrOyLtewXb6ycc8nXJ9P6EyXgfowwv545u" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 23, 15, 54, 0, 102, DateTimeKind.Local).AddTicks(8156), "$2a$11$lsPGLPj6eABAX4ep2ysrrOyLtewXb6ycc8nXJ9P6EyXgfowwv545u" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 23, 15, 54, 0, 102, DateTimeKind.Local).AddTicks(8158), "$2a$11$lsPGLPj6eABAX4ep2ysrrOyLtewXb6ycc8nXJ9P6EyXgfowwv545u" });

            migrationBuilder.CreateIndex(
                name: "IX_TaskModel_UserId",
                table: "TaskModel",
                column: "UserId");
        }
    }
}
