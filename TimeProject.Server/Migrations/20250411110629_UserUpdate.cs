using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TimeProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class UserUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 4, 11, 14, 6, 28, 423, DateTimeKind.Local).AddTicks(5384), "$2a$11$pNpl6CuE0/pMm1Fh4HxD.OoqihoV/UVAITHDI04/QTyi/wNU/kQGq" });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "UserId", "AccountStatusId", "AccountStatusId1", "CreateDate", "Email", "ImageUrl", "Name", "PasswordHash", "PhoneNumber", "RoleId", "Surname", "TestResult" },
                values: new object[,]
                {
                    { 2, "Active", null, new DateTime(2025, 4, 11, 14, 6, 28, 423, DateTimeKind.Local).AddTicks(5404), "mehmet@example.com", "/images/mona.jpg", "Mehmet", "$2a$11$pNpl6CuE0/pMm1Fh4HxD.OoqihoV/UVAITHDI04/QTyi/wNU/kQGq", "05537668452", 2, "Ali", false },
                    { 3, "Active", null, new DateTime(2025, 4, 11, 14, 6, 28, 423, DateTimeKind.Local).AddTicks(5407), "ahmet@example.com", "/images/mona.jpg", "ahmet", "$2a$11$pNpl6CuE0/pMm1Fh4HxD.OoqihoV/UVAITHDI04/QTyi/wNU/kQGq", "05528445566", 2, "can", false }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3);

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 4, 10, 11, 35, 57, 34, DateTimeKind.Local).AddTicks(4683), "$2a$11$ipBqJP9XwPU8rSJlo0uGtuX8dkeahznWVZsblc509YsgQnHfvd0cq" });
        }
    }
}
