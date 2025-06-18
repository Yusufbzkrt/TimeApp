using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class ApplicationUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
    }
}
