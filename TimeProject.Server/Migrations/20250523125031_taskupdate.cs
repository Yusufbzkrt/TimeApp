using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class taskupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 23, 15, 44, 52, 941, DateTimeKind.Local).AddTicks(3380), "$2a$11$yot34Z6K6cMi3tlXKA8RPeGpU/VHNUlKpUxim6eeb/FhKThaUOXUq" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 23, 15, 44, 52, 941, DateTimeKind.Local).AddTicks(3402), "$2a$11$yot34Z6K6cMi3tlXKA8RPeGpU/VHNUlKpUxim6eeb/FhKThaUOXUq" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 23, 15, 44, 52, 941, DateTimeKind.Local).AddTicks(3404), "$2a$11$yot34Z6K6cMi3tlXKA8RPeGpU/VHNUlKpUxim6eeb/FhKThaUOXUq" });
        }
    }
}
