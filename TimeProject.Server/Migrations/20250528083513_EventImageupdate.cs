using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class EventImageupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImageUrl",
                table: "Events",
                newName: "Image");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 28, 11, 35, 12, 574, DateTimeKind.Local).AddTicks(4641), "$2a$11$38lyjpkNnTH5grbcH7QbIe37ApxNa6MBzJEKth1tyqCDZjoSeASHK" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 28, 11, 35, 12, 574, DateTimeKind.Local).AddTicks(4667), "$2a$11$38lyjpkNnTH5grbcH7QbIe37ApxNa6MBzJEKth1tyqCDZjoSeASHK" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 28, 11, 35, 12, 574, DateTimeKind.Local).AddTicks(4669), "$2a$11$38lyjpkNnTH5grbcH7QbIe37ApxNa6MBzJEKth1tyqCDZjoSeASHK" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Image",
                table: "Events",
                newName: "ImageUrl");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 28, 11, 23, 52, 945, DateTimeKind.Local).AddTicks(9499), "$2a$11$0GOlxltZFMpRU3rzmjbXCeY44oJlpEOZT7lMewU5K2Zzrv/bGwtdG" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 28, 11, 23, 52, 945, DateTimeKind.Local).AddTicks(9523), "$2a$11$0GOlxltZFMpRU3rzmjbXCeY44oJlpEOZT7lMewU5K2Zzrv/bGwtdG" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 28, 11, 23, 52, 945, DateTimeKind.Local).AddTicks(9525), "$2a$11$0GOlxltZFMpRU3rzmjbXCeY44oJlpEOZT7lMewU5K2Zzrv/bGwtdG" });
        }
    }
}
