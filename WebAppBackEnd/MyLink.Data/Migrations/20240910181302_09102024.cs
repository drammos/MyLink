using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MyLink.Data.Migrations
{
    /// <inheritdoc />
    public partial class _09102024 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0a5b12c3-457c-4021-9462-53320297b77e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c19e098b-a5e0-416b-bbcb-e989ff59ecbb");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "380fe89c-7146-47e9-b7d1-f6962df3a45c", null, "Admin", "ADMIN" },
                    { "4427b9b3-1439-48b3-aee1-845562ab7f9d", null, "Professional", "PROFESSIONAL" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "380fe89c-7146-47e9-b7d1-f6962df3a45c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4427b9b3-1439-48b3-aee1-845562ab7f9d");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0a5b12c3-457c-4021-9462-53320297b77e", null, "Admin", "ADMIN" },
                    { "c19e098b-a5e0-416b-bbcb-e989ff59ecbb", null, "Professional", "PROFESSIONAL" }
                });
        }
    }
}
