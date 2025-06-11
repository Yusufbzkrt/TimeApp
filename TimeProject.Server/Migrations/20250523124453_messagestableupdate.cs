using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class messagestableupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 23, 15, 43, 28, 804, DateTimeKind.Local).AddTicks(6872), "$2a$11$l4PXV.y5RRYurPUytKX.zOkEINN2cGanlRC65Y3tc28hPIKgw4fAq" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 23, 15, 43, 28, 804, DateTimeKind.Local).AddTicks(6895), "$2a$11$l4PXV.y5RRYurPUytKX.zOkEINN2cGanlRC65Y3tc28hPIKgw4fAq" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 23, 15, 43, 28, 804, DateTimeKind.Local).AddTicks(6898), "$2a$11$l4PXV.y5RRYurPUytKX.zOkEINN2cGanlRC65Y3tc28hPIKgw4fAq" });
        }
    }
}
