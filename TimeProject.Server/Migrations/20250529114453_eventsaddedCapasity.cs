using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class eventsaddedCapasity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Capacity",
                table: "Events",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CurrentParticipants",
                table: "Events",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 29, 14, 44, 52, 295, DateTimeKind.Local).AddTicks(2584), "$2a$11$RwnkMDkBnTGsNuFKHZqM2eEMcNQ2ERx6F4fBwROTUsohUxiVIDJaC" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 29, 14, 44, 52, 295, DateTimeKind.Local).AddTicks(2608), "$2a$11$RwnkMDkBnTGsNuFKHZqM2eEMcNQ2ERx6F4fBwROTUsohUxiVIDJaC" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 29, 14, 44, 52, 295, DateTimeKind.Local).AddTicks(2611), "$2a$11$RwnkMDkBnTGsNuFKHZqM2eEMcNQ2ERx6F4fBwROTUsohUxiVIDJaC" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Capacity",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "CurrentParticipants",
                table: "Events");

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
    }
}
