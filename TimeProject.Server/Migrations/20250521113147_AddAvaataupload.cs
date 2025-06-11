using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddAvaataupload : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash", "avatar" },
                values: new object[] { new DateTime(2025, 5, 21, 14, 31, 46, 151, DateTimeKind.Local).AddTicks(4688), "$2a$11$oW9vLQSKSQX45SixX3QRF.f4XBoGI.TusYZI/mVpMSEvbOKBOi.5S", "mona.jpg" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash", "avatar" },
                values: new object[] { new DateTime(2025, 5, 21, 14, 31, 46, 151, DateTimeKind.Local).AddTicks(4713), "$2a$11$oW9vLQSKSQX45SixX3QRF.f4XBoGI.TusYZI/mVpMSEvbOKBOi.5S", "mona.jpg" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 21, 14, 31, 46, 151, DateTimeKind.Local).AddTicks(4716), "$2a$11$oW9vLQSKSQX45SixX3QRF.f4XBoGI.TusYZI/mVpMSEvbOKBOi.5S" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash", "avatar" },
                values: new object[] { new DateTime(2025, 5, 21, 14, 19, 0, 456, DateTimeKind.Local).AddTicks(4659), "$2a$11$4xoK2/2RHwBKlcjgkB0bjuiz5gENKmuY5wgTjzTlyHruYwvgdPRgW", "/images/mona.jpg" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash", "avatar" },
                values: new object[] { new DateTime(2025, 5, 21, 14, 19, 0, 456, DateTimeKind.Local).AddTicks(4716), "$2a$11$4xoK2/2RHwBKlcjgkB0bjuiz5gENKmuY5wgTjzTlyHruYwvgdPRgW", "/images/mona.jpg" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 21, 14, 19, 0, 456, DateTimeKind.Local).AddTicks(4720), "$2a$11$4xoK2/2RHwBKlcjgkB0bjuiz5gENKmuY5wgTjzTlyHruYwvgdPRgW" });
        }
    }
}
