using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class TaskTableuploadtwo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "TaskModel",
                columns: new[] { "TaskID", "CreatedByUserID", "CreatedDate", "Description", "DueDate", "Priority", "Status", "TaskName", "UpdatedDate" },
                values: new object[] { 1, 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Ödevi yap", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Normal", "pending", "Ödev", null });

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "TaskModel",
                keyColumn: "TaskID",
                keyValue: 1);

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 22, 17, 51, 11, 222, DateTimeKind.Local).AddTicks(5176), "$2a$11$9fN.wZ5.ssVhdG8GtW5OjuK4qbtaedXuZZLsFiYZMCpgZuSPOPz4K" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 22, 17, 51, 11, 222, DateTimeKind.Local).AddTicks(5348), "$2a$11$9fN.wZ5.ssVhdG8GtW5OjuK4qbtaedXuZZLsFiYZMCpgZuSPOPz4K" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 22, 17, 51, 11, 222, DateTimeKind.Local).AddTicks(5352), "$2a$11$9fN.wZ5.ssVhdG8GtW5OjuK4qbtaedXuZZLsFiYZMCpgZuSPOPz4K" });
        }
    }
}
