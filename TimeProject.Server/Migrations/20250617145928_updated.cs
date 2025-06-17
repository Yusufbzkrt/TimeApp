using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class updated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 6, 17, 17, 59, 28, 251, DateTimeKind.Local).AddTicks(1641), "$2a$11$ybnq8ZifTHIB3BahSdjcNOvZnDpc58xEH6GKp/SMy0W/F32uCaoh." });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 6, 17, 17, 59, 28, 251, DateTimeKind.Local).AddTicks(1718), "$2a$11$ybnq8ZifTHIB3BahSdjcNOvZnDpc58xEH6GKp/SMy0W/F32uCaoh." });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 6, 17, 17, 59, 28, 251, DateTimeKind.Local).AddTicks(1719), "$2a$11$ybnq8ZifTHIB3BahSdjcNOvZnDpc58xEH6GKp/SMy0W/F32uCaoh." });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 6, 17, 15, 54, 53, 462, DateTimeKind.Local).AddTicks(3573), "$2a$11$V3VdrXraDVow8NVzDScRpuA1Oi8G9oiwPBpI5GEc8uvRrRLefZgAu" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 6, 17, 15, 54, 53, 462, DateTimeKind.Local).AddTicks(3598), "$2a$11$V3VdrXraDVow8NVzDScRpuA1Oi8G9oiwPBpI5GEc8uvRrRLefZgAu" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 6, 17, 15, 54, 53, 462, DateTimeKind.Local).AddTicks(3600), "$2a$11$V3VdrXraDVow8NVzDScRpuA1Oi8G9oiwPBpI5GEc8uvRrRLefZgAu" });
        }
    }
}
