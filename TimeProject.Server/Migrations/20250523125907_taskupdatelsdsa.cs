using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class taskupdatelsdsa : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TaskModel",
                columns: table => new
                {
                    TaskID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TaskName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    DueDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Priority = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
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
                values: new object[] { new DateTime(2025, 5, 23, 15, 59, 6, 272, DateTimeKind.Local).AddTicks(5515), "$2a$11$5zbQsYf62pvBrVbGxvMg7ehd49pkFoW5lqi.VcKjgZkAo4Dd3ET9K" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 23, 15, 59, 6, 272, DateTimeKind.Local).AddTicks(5540), "$2a$11$5zbQsYf62pvBrVbGxvMg7ehd49pkFoW5lqi.VcKjgZkAo4Dd3ET9K" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 23, 15, 59, 6, 272, DateTimeKind.Local).AddTicks(5542), "$2a$11$5zbQsYf62pvBrVbGxvMg7ehd49pkFoW5lqi.VcKjgZkAo4Dd3ET9K" });

            migrationBuilder.CreateIndex(
                name: "IX_TaskModel_UserId",
                table: "TaskModel",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
    }
}
