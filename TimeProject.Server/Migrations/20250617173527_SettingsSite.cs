using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class SettingsSite : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SettingsSites",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Notifications_Email = table.Column<bool>(type: "bit", nullable: false),
                    Notifications_Push = table.Column<bool>(type: "bit", nullable: false),
                    Notifications_Sound = table.Column<bool>(type: "bit", nullable: false),
                    Language = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    FontSize = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    SoundEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AutoSave = table.Column<bool>(type: "bit", nullable: false),
                    Theme = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SettingsSites", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_SettingsSites_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 6, 17, 20, 35, 27, 362, DateTimeKind.Local).AddTicks(1896), "$2a$11$iSU/2ccOftTp0TfEndfO8u.OE8faNuArvk8G04GvNDIvNKi6GJ7SO" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 6, 17, 20, 35, 27, 362, DateTimeKind.Local).AddTicks(1915), "$2a$11$iSU/2ccOftTp0TfEndfO8u.OE8faNuArvk8G04GvNDIvNKi6GJ7SO" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 6, 17, 20, 35, 27, 362, DateTimeKind.Local).AddTicks(1917), "$2a$11$iSU/2ccOftTp0TfEndfO8u.OE8faNuArvk8G04GvNDIvNKi6GJ7SO" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SettingsSites");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 6, 17, 17, 59, 28, 251, DateTimeKind.Local).AddTicks(1641), "$2a$11$ybnq8ZifTHIB3BahSdjcNOvZnDpc58xEH6GKp/SMy0W/F32uCaoh." });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 6, 17, 17, 59, 28, 251, DateTimeKind.Local).AddTicks(1718), "$2a$11$ybnq8ZifTHIB3BahSdjcNOvZnDpc58xEH6GKp/SMy0W/F32uCaoh." });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 6, 17, 17, 59, 28, 251, DateTimeKind.Local).AddTicks(1719), "$2a$11$ybnq8ZifTHIB3BahSdjcNOvZnDpc58xEH6GKp/SMy0W/F32uCaoh." });
        }
    }
}
