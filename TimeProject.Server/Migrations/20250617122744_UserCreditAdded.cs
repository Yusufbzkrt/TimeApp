using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class UserCreditAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Credit",
                table: "User",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "Credit", "PasswordHash" },
                values: new object[] { new DateTime(2025, 6, 17, 15, 27, 44, 232, DateTimeKind.Local).AddTicks(2087), 0, "$2a$11$dQr6Yta5PeFFwCp2VHJ.fOV7XvWc1aGuarHE3afwgN6ULDBS8ljru" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "Credit", "PasswordHash" },
                values: new object[] { new DateTime(2025, 6, 17, 15, 27, 44, 232, DateTimeKind.Local).AddTicks(2106), 0, "$2a$11$dQr6Yta5PeFFwCp2VHJ.fOV7XvWc1aGuarHE3afwgN6ULDBS8ljru" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "Credit", "PasswordHash" },
                values: new object[] { new DateTime(2025, 6, 17, 15, 27, 44, 232, DateTimeKind.Local).AddTicks(2108), 0, "$2a$11$dQr6Yta5PeFFwCp2VHJ.fOV7XvWc1aGuarHE3afwgN6ULDBS8ljru" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Credit",
                table: "User");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 6, 17, 14, 42, 12, 566, DateTimeKind.Local).AddTicks(2969), "$2a$11$8ckLj9Kg8glZ433QStpS3OmPjyfA.ug0Hu.AR2cPLKpnGl3aoUnem" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 6, 17, 14, 42, 12, 566, DateTimeKind.Local).AddTicks(2989), "$2a$11$8ckLj9Kg8glZ433QStpS3OmPjyfA.ug0Hu.AR2cPLKpnGl3aoUnem" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 6, 17, 14, 42, 12, 566, DateTimeKind.Local).AddTicks(2990), "$2a$11$8ckLj9Kg8glZ433QStpS3OmPjyfA.ug0Hu.AR2cPLKpnGl3aoUnem" });
        }
    }
}
