using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class EventParticipantAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EventParticipants",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EventId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JoinedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventParticipants", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EventParticipants_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "EventsId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 29, 14, 59, 57, 898, DateTimeKind.Local).AddTicks(825), "$2a$11$D.t/b8t0gHtDcufqtuQTg.9nkfpdGQEeFRB4hFKd2HxlHi.zWInae" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 29, 14, 59, 57, 898, DateTimeKind.Local).AddTicks(850), "$2a$11$D.t/b8t0gHtDcufqtuQTg.9nkfpdGQEeFRB4hFKd2HxlHi.zWInae" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 29, 14, 59, 57, 898, DateTimeKind.Local).AddTicks(853), "$2a$11$D.t/b8t0gHtDcufqtuQTg.9nkfpdGQEeFRB4hFKd2HxlHi.zWInae" });

            migrationBuilder.CreateIndex(
                name: "IX_EventParticipants_EventId",
                table: "EventParticipants",
                column: "EventId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EventParticipants");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 29, 14, 44, 52, 295, DateTimeKind.Local).AddTicks(2584), "$2a$11$RwnkMDkBnTGsNuFKHZqM2eEMcNQ2ERx6F4fBwROTUsohUxiVIDJaC" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 29, 14, 44, 52, 295, DateTimeKind.Local).AddTicks(2608), "$2a$11$RwnkMDkBnTGsNuFKHZqM2eEMcNQ2ERx6F4fBwROTUsohUxiVIDJaC" });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreateDate", "PasswordHash" },
                values: new object[] { new DateTime(2025, 5, 29, 14, 44, 52, 295, DateTimeKind.Local).AddTicks(2611), "$2a$11$RwnkMDkBnTGsNuFKHZqM2eEMcNQ2ERx6F4fBwROTUsohUxiVIDJaC" });
        }
    }
}
