using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class ConfigureUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "ImageUrl", "PasswordHash" },
                values: new object[] { new DateTime(2025, 4, 8, 17, 4, 49, 863, DateTimeKind.Local).AddTicks(7091), "/images/mona.jpg", "$2a$11$98gr0S7BEHxiTZAA/R2n7eVL1tY4ndjFDnSGNTTnw3OfYHLoyhY.q" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "ImageUrl", "PasswordHash" },
                values: new object[] { new DateTime(2025, 4, 8, 11, 35, 54, 88, DateTimeKind.Local).AddTicks(9514), null, "$2a$11$AOB0lkPtQHgw7ErcD5kFr.5lIwt4LW0Nvt8De2ySptMaz4fV1OJlC" });
        }
    }
}
