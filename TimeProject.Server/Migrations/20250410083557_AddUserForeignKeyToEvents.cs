using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddUserForeignKeyToEvents : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_User_UserId",
                table: "Events");

            migrationBuilder.DropIndex(
                name: "IX_Events_UserId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Events");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 4, 10, 11, 35, 57, 34, DateTimeKind.Local).AddTicks(4683), "$2a$11$ipBqJP9XwPU8rSJlo0uGtuX8dkeahznWVZsblc509YsgQnHfvd0cq" });

            migrationBuilder.CreateIndex(
                name: "IX_Events_CreatedByUserID",
                table: "Events",
                column: "CreatedByUserID");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_User_CreatedByUserID",
                table: "Events",
                column: "CreatedByUserID",
                principalTable: "User",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_User_CreatedByUserID",
                table: "Events");

            migrationBuilder.DropIndex(
                name: "IX_Events_CreatedByUserID",
                table: "Events");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Events",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 4, 9, 10, 7, 1, 525, DateTimeKind.Local).AddTicks(4656), "$2a$11$gurHcu67NeQ9NKqzmz8f7OjM/qzqEaVYJbMmss2v0fcH6Ys9daljq" });

            migrationBuilder.CreateIndex(
                name: "IX_Events_UserId",
                table: "Events",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_User_UserId",
                table: "Events",
                column: "UserId",
                principalTable: "User",
                principalColumn: "UserId");
        }
    }
}
