using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class ApplicationUsertwo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ApplicationUser",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationUser", x => x.Id);
                });

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApplicationUser");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 6, 17, 23, 48, 49, 437, DateTimeKind.Local).AddTicks(303), "$2a$11$jOcczAInm.zWuCioV1AbMuge8PYAs4WxByqnQKJSsoOgZqOkQLxGG" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 6, 17, 23, 48, 49, 437, DateTimeKind.Local).AddTicks(332), "$2a$11$jOcczAInm.zWuCioV1AbMuge8PYAs4WxByqnQKJSsoOgZqOkQLxGG" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 6, 17, 23, 48, 49, 437, DateTimeKind.Local).AddTicks(333), "$2a$11$jOcczAInm.zWuCioV1AbMuge8PYAs4WxByqnQKJSsoOgZqOkQLxGG" });
        }
    }
}
