using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class taskupdatel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 23, 15, 50, 30, 31, DateTimeKind.Local).AddTicks(608), "$2a$11$JPhhqLGedhYjw3E7uS7K7eqI9lRDfWNRE78jciau/gCalmU7gtdaq" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 23, 15, 50, 30, 31, DateTimeKind.Local).AddTicks(632), "$2a$11$JPhhqLGedhYjw3E7uS7K7eqI9lRDfWNRE78jciau/gCalmU7gtdaq" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 23, 15, 50, 30, 31, DateTimeKind.Local).AddTicks(634), "$2a$11$JPhhqLGedhYjw3E7uS7K7eqI9lRDfWNRE78jciau/gCalmU7gtdaq" });
        }
    }
}
