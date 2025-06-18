using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class passwordResetToken : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PasswordResetTokens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Token = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ExpiryDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsUsed = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PasswordResetTokens", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 6, 18, 3, 1, 45, 821, DateTimeKind.Local).AddTicks(1296), "$2a$11$PpblaKgqJIXcbHQDjTDcgu1wXKN6KOK/OvSOG5EvDtz7WZFayKwWO" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 6, 18, 3, 1, 45, 821, DateTimeKind.Local).AddTicks(1314), "$2a$11$PpblaKgqJIXcbHQDjTDcgu1wXKN6KOK/OvSOG5EvDtz7WZFayKwWO" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 6, 18, 3, 1, 45, 821, DateTimeKind.Local).AddTicks(1316), "$2a$11$PpblaKgqJIXcbHQDjTDcgu1wXKN6KOK/OvSOG5EvDtz7WZFayKwWO" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PasswordResetTokens");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 6, 18, 0, 3, 26, 350, DateTimeKind.Local).AddTicks(7634), "$2a$11$RsAHyiiX/VvxEnC19Mq5muPsfh.qpX86PRl/tMx0ZRBypsRofXjhm" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 6, 18, 0, 3, 26, 350, DateTimeKind.Local).AddTicks(7660), "$2a$11$RsAHyiiX/VvxEnC19Mq5muPsfh.qpX86PRl/tMx0ZRBypsRofXjhm" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 6, 18, 0, 3, 26, 350, DateTimeKind.Local).AddTicks(7662), "$2a$11$RsAHyiiX/VvxEnC19Mq5muPsfh.qpX86PRl/tMx0ZRBypsRofXjhm" });
        }
    }
}
