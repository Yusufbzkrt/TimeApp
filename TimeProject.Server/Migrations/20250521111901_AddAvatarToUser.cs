using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddAvatarToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImageUrl",
                table: "User",
                newName: "avatar");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 21, 14, 19, 0, 456, DateTimeKind.Local).AddTicks(4659), "$2a$11$4xoK2/2RHwBKlcjgkB0bjuiz5gENKmuY5wgTjzTlyHruYwvgdPRgW" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 21, 14, 19, 0, 456, DateTimeKind.Local).AddTicks(4716), "$2a$11$4xoK2/2RHwBKlcjgkB0bjuiz5gENKmuY5wgTjzTlyHruYwvgdPRgW" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 21, 14, 19, 0, 456, DateTimeKind.Local).AddTicks(4720), "$2a$11$4xoK2/2RHwBKlcjgkB0bjuiz5gENKmuY5wgTjzTlyHruYwvgdPRgW" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "avatar",
                table: "User",
                newName: "ImageUrl");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 4, 11, 14, 6, 28, 423, DateTimeKind.Local).AddTicks(5384), "$2a$11$pNpl6CuE0/pMm1Fh4HxD.OoqihoV/UVAITHDI04/QTyi/wNU/kQGq" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 4, 11, 14, 6, 28, 423, DateTimeKind.Local).AddTicks(5404), "$2a$11$pNpl6CuE0/pMm1Fh4HxD.OoqihoV/UVAITHDI04/QTyi/wNU/kQGq" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 4, 11, 14, 6, 28, 423, DateTimeKind.Local).AddTicks(5407), "$2a$11$pNpl6CuE0/pMm1Fh4HxD.OoqihoV/UVAITHDI04/QTyi/wNU/kQGq" });
        }
    }
}
