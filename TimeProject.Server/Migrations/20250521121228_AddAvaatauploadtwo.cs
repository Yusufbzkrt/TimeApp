using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddAvaatauploadtwo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash", "avatar" },
                values: new object[] { new DateTime(2025, 5, 21, 15, 12, 27, 521, DateTimeKind.Local).AddTicks(2071), "$2a$11$h6IYR9P8sKXoF.ljfe0tKuQP7pFRFHz3bKunLEk7hlGjqkFRsB.dK", "/images/mona.jpg" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash", "avatar" },
                values: new object[] { new DateTime(2025, 5, 21, 15, 12, 27, 521, DateTimeKind.Local).AddTicks(2096), "$2a$11$h6IYR9P8sKXoF.ljfe0tKuQP7pFRFHz3bKunLEk7hlGjqkFRsB.dK", null });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash", "avatar" },
                values: new object[] { new DateTime(2025, 5, 21, 15, 12, 27, 521, DateTimeKind.Local).AddTicks(2098), "$2a$11$h6IYR9P8sKXoF.ljfe0tKuQP7pFRFHz3bKunLEk7hlGjqkFRsB.dK", null });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                columns: new[] { "CreateDate", "PasswordHash", "avatar" },
                values: new object[] { new DateTime(2025, 5, 21, 14, 31, 46, 151, DateTimeKind.Local).AddTicks(4716), "$2a$11$oW9vLQSKSQX45SixX3QRF.f4XBoGI.TusYZI/mVpMSEvbOKBOi.5S", "/images/mona.jpg" });
        }
    }
}
