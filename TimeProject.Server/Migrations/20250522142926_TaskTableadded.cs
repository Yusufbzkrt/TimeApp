using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class TaskTableadded : Migration
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
                    CreatedByUserID = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskModel", x => x.TaskID);
                    table.ForeignKey(
                        name: "FK_TaskModel_User_CreatedByUserID",
                        column: x => x.CreatedByUserID,
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 22, 17, 29, 25, 155, DateTimeKind.Local).AddTicks(247), "$2a$11$QBJ6A1vw3GUFuDTkX03bmetmsMwT5RPEFOFo/2hXorxaejm/EDIwO" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 22, 17, 29, 25, 155, DateTimeKind.Local).AddTicks(298), "$2a$11$QBJ6A1vw3GUFuDTkX03bmetmsMwT5RPEFOFo/2hXorxaejm/EDIwO" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 22, 17, 29, 25, 155, DateTimeKind.Local).AddTicks(301), "$2a$11$QBJ6A1vw3GUFuDTkX03bmetmsMwT5RPEFOFo/2hXorxaejm/EDIwO" });

            migrationBuilder.CreateIndex(
                name: "IX_TaskModel_CreatedByUserID",
                table: "TaskModel",
                column: "CreatedByUserID");
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
                values: new object[] { new DateTime(2025, 5, 21, 15, 12, 27, 521, DateTimeKind.Local).AddTicks(2071), "$2a$11$h6IYR9P8sKXoF.ljfe0tKuQP7pFRFHz3bKunLEk7hlGjqkFRsB.dK" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 21, 15, 12, 27, 521, DateTimeKind.Local).AddTicks(2096), "$2a$11$h6IYR9P8sKXoF.ljfe0tKuQP7pFRFHz3bKunLEk7hlGjqkFRsB.dK" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 21, 15, 12, 27, 521, DateTimeKind.Local).AddTicks(2098), "$2a$11$h6IYR9P8sKXoF.ljfe0tKuQP7pFRFHz3bKunLEk7hlGjqkFRsB.dK" });
        }
    }
}
