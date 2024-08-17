using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MyLink.Data.Migrations
{
    /// <inheritdoc />
    public partial class Update17Aug : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4239cc8c-3243-44c7-82f8-309b78cb15f0");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "70b35cfe-cfb4-4ada-b255-b8bd2681c077");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "61c67059-882b-4ead-b434-530ea73c2be6", null, "Professional", "PROFESSIONAL" },
                    { "7616b115-f71b-4578-b33f-002350a8e238", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "61c67059-882b-4ead-b434-530ea73c2be6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7616b115-f71b-4578-b33f-002350a8e238");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4239cc8c-3243-44c7-82f8-309b78cb15f0", null, "Admin", "ADMIN" },
                    { "70b35cfe-cfb4-4ada-b255-b8bd2681c077", null, "Professional", "PROFESSIONAL" }
                });
        }
    }
}
