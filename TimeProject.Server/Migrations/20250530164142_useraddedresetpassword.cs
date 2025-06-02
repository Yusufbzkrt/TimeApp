using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class useraddedresetpassword : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PasswordResetToken",
                table: "User",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "PasswordResetTokenExpires",
                table: "User",
                type: "datetime2",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash", "PasswordResetToken", "PasswordResetTokenExpires" },
                values: new object[] { new DateTime(2025, 5, 30, 19, 41, 41, 887, DateTimeKind.Local).AddTicks(8204), "$2a$11$BQxqXDoYufcd2QspfTg54eYbN.OdCHaF0ihUUoqUMcJ3.PIW8d0aC", null, null });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash", "PasswordResetToken", "PasswordResetTokenExpires" },
                values: new object[] { new DateTime(2025, 5, 30, 19, 41, 41, 887, DateTimeKind.Local).AddTicks(8226), "$2a$11$BQxqXDoYufcd2QspfTg54eYbN.OdCHaF0ihUUoqUMcJ3.PIW8d0aC", null, null });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash", "PasswordResetToken", "PasswordResetTokenExpires" },
                values: new object[] { new DateTime(2025, 5, 30, 19, 41, 41, 887, DateTimeKind.Local).AddTicks(8382), "$2a$11$BQxqXDoYufcd2QspfTg54eYbN.OdCHaF0ihUUoqUMcJ3.PIW8d0aC", null, null });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PasswordResetToken",
                table: "User");

            migrationBuilder.DropColumn(
                name: "PasswordResetTokenExpires",
                table: "User");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 29, 14, 59, 57, 898, DateTimeKind.Local).AddTicks(825), "$2a$11$D.t/b8t0gHtDcufqtuQTg.9nkfpdGQEeFRB4hFKd2HxlHi.zWInae" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 29, 14, 59, 57, 898, DateTimeKind.Local).AddTicks(850), "$2a$11$D.t/b8t0gHtDcufqtuQTg.9nkfpdGQEeFRB4hFKd2HxlHi.zWInae" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 29, 14, 59, 57, 898, DateTimeKind.Local).AddTicks(853), "$2a$11$D.t/b8t0gHtDcufqtuQTg.9nkfpdGQEeFRB4hFKd2HxlHi.zWInae" });
        }
    }
}
