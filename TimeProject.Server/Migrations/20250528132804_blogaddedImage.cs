using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class blogaddedImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Blog",
                type: "nvarchar(max)",
                nullable: true);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Blog");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 28, 11, 35, 12, 574, DateTimeKind.Local).AddTicks(4641), "$2a$11$38lyjpkNnTH5grbcH7QbIe37ApxNa6MBzJEKth1tyqCDZjoSeASHK" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 28, 11, 35, 12, 574, DateTimeKind.Local).AddTicks(4667), "$2a$11$38lyjpkNnTH5grbcH7QbIe37ApxNa6MBzJEKth1tyqCDZjoSeASHK" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 28, 11, 35, 12, 574, DateTimeKind.Local).AddTicks(4669), "$2a$11$38lyjpkNnTH5grbcH7QbIe37ApxNa6MBzJEKth1tyqCDZjoSeASHK" });
        }
    }
}
