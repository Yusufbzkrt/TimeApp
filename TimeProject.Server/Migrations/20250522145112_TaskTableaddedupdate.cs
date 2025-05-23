using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class TaskTableaddedupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 22, 17, 51, 11, 222, DateTimeKind.Local).AddTicks(5176), "$2a$11$9fN.wZ5.ssVhdG8GtW5OjuK4qbtaedXuZZLsFiYZMCpgZuSPOPz4K" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 22, 17, 51, 11, 222, DateTimeKind.Local).AddTicks(5348), "$2a$11$9fN.wZ5.ssVhdG8GtW5OjuK4qbtaedXuZZLsFiYZMCpgZuSPOPz4K" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 22, 17, 51, 11, 222, DateTimeKind.Local).AddTicks(5352), "$2a$11$9fN.wZ5.ssVhdG8GtW5OjuK4qbtaedXuZZLsFiYZMCpgZuSPOPz4K" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 22, 17, 29, 25, 155, DateTimeKind.Local).AddTicks(247), "$2a$11$QBJ6A1vw3GUFuDTkX03bmetmsMwT5RPEFOFo/2hXorxaejm/EDIwO" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 22, 17, 29, 25, 155, DateTimeKind.Local).AddTicks(298), "$2a$11$QBJ6A1vw3GUFuDTkX03bmetmsMwT5RPEFOFo/2hXorxaejm/EDIwO" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 22, 17, 29, 25, 155, DateTimeKind.Local).AddTicks(301), "$2a$11$QBJ6A1vw3GUFuDTkX03bmetmsMwT5RPEFOFo/2hXorxaejm/EDIwO" });
        }
    }
}
