using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class eventsaddedLocation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Events",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 29, 14, 13, 6, 937, DateTimeKind.Local).AddTicks(5816), "$2a$11$vJfM/VJV0Ts3Pcr0UBz.SOoGpLapTcxE1EOE5JrByLLeh689JttwG" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 29, 14, 13, 6, 937, DateTimeKind.Local).AddTicks(5840), "$2a$11$vJfM/VJV0Ts3Pcr0UBz.SOoGpLapTcxE1EOE5JrByLLeh689JttwG" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 29, 14, 13, 6, 937, DateTimeKind.Local).AddTicks(5843), "$2a$11$vJfM/VJV0Ts3Pcr0UBz.SOoGpLapTcxE1EOE5JrByLLeh689JttwG" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location",
                table: "Events");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 28, 16, 28, 3, 592, DateTimeKind.Local).AddTicks(5052), "$2a$11$ejEOdduczDOgGgh8AhJdpehV396g2ljRMnXNClYRXw0X4dXf00bRm" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 28, 16, 28, 3, 592, DateTimeKind.Local).AddTicks(5077), "$2a$11$ejEOdduczDOgGgh8AhJdpehV396g2ljRMnXNClYRXw0X4dXf00bRm" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 28, 16, 28, 3, 592, DateTimeKind.Local).AddTicks(5080), "$2a$11$ejEOdduczDOgGgh8AhJdpehV396g2ljRMnXNClYRXw0X4dXf00bRm" });
        }
    }
}
