using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class TaskTableuploadthree : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "TaskModel",
                keyColumn: "TaskID",
                keyValue: 1,
                column: "CreatedByUserID",
                value: 8);

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 22, 17, 57, 36, 299, DateTimeKind.Local).AddTicks(9842), "$2a$11$WMqUBW6tOIgKlywXVIeD2.Qs8/as7qMPJMc/mM6PydqxYzq8FEfSy" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 22, 17, 57, 36, 299, DateTimeKind.Local).AddTicks(9901), "$2a$11$WMqUBW6tOIgKlywXVIeD2.Qs8/as7qMPJMc/mM6PydqxYzq8FEfSy" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 22, 17, 57, 36, 299, DateTimeKind.Local).AddTicks(9904), "$2a$11$WMqUBW6tOIgKlywXVIeD2.Qs8/as7qMPJMc/mM6PydqxYzq8FEfSy" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "TaskModel",
                keyColumn: "TaskID",
                keyValue: 1,
                column: "CreatedByUserID",
                value: 0);

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 22, 17, 55, 54, 87, DateTimeKind.Local).AddTicks(8783), "$2a$11$TFqR4poX.Nw5EWvg3.M4hu4.NgstHIJlcWQSAYqd.l.YNHqFp8xGa" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 22, 17, 55, 54, 87, DateTimeKind.Local).AddTicks(8845), "$2a$11$TFqR4poX.Nw5EWvg3.M4hu4.NgstHIJlcWQSAYqd.l.YNHqFp8xGa" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 22, 17, 55, 54, 87, DateTimeKind.Local).AddTicks(8848), "$2a$11$TFqR4poX.Nw5EWvg3.M4hu4.NgstHIJlcWQSAYqd.l.YNHqFp8xGa" });
        }
    }
}
