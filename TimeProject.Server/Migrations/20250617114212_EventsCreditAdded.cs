using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class EventsCreditAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Credit",
                table: "Events",
                type: "int",
                nullable: false,
                defaultValue: 0);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Credit",
                table: "Events");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 6, 15, 17, 9, 54, 82, DateTimeKind.Local).AddTicks(3304), "$2a$11$DdyaGxrvoEhTmTr0NedY2eWhn65CK5B39ceI2vC3jjMeYz.NSof9." });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 6, 15, 17, 9, 54, 82, DateTimeKind.Local).AddTicks(3323), "$2a$11$DdyaGxrvoEhTmTr0NedY2eWhn65CK5B39ceI2vC3jjMeYz.NSof9." });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 6, 15, 17, 9, 54, 82, DateTimeKind.Local).AddTicks(3324), "$2a$11$DdyaGxrvoEhTmTr0NedY2eWhn65CK5B39ceI2vC3jjMeYz.NSof9." });
        }
    }
}
