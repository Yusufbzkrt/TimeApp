using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class EventImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Events",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 28, 11, 23, 52, 945, DateTimeKind.Local).AddTicks(9499), "$2a$11$0GOlxltZFMpRU3rzmjbXCeY44oJlpEOZT7lMewU5K2Zzrv/bGwtdG" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 28, 11, 23, 52, 945, DateTimeKind.Local).AddTicks(9523), "$2a$11$0GOlxltZFMpRU3rzmjbXCeY44oJlpEOZT7lMewU5K2Zzrv/bGwtdG" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 28, 11, 23, 52, 945, DateTimeKind.Local).AddTicks(9525), "$2a$11$0GOlxltZFMpRU3rzmjbXCeY44oJlpEOZT7lMewU5K2Zzrv/bGwtdG" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Events");

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
        }
    }
}
