using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class eventparticipantadded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "EventParticipants",
                type: "int",
                nullable: false,
                defaultValue: 0);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "EventParticipants");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 6, 17, 15, 27, 44, 232, DateTimeKind.Local).AddTicks(2087), "$2a$11$dQr6Yta5PeFFwCp2VHJ.fOV7XvWc1aGuarHE3afwgN6ULDBS8ljru" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 6, 17, 15, 27, 44, 232, DateTimeKind.Local).AddTicks(2106), "$2a$11$dQr6Yta5PeFFwCp2VHJ.fOV7XvWc1aGuarHE3afwgN6ULDBS8ljru" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 6, 17, 15, 27, 44, 232, DateTimeKind.Local).AddTicks(2108), "$2a$11$dQr6Yta5PeFFwCp2VHJ.fOV7XvWc1aGuarHE3afwgN6ULDBS8ljru" });
        }
    }
}
