using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MyLink.Data.Migrations
{
    /// <inheritdoc />
    public partial class Update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "20e56afb-6c60-40f5-9b22-0958d36efd31");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "84619ce3-91cf-4cb8-a473-e9ec869a221b");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "36951a3a-f7cb-4f5c-bb43-00cce4dbb9d8", null, "Admin", "ADMIN" },
                    { "6ef75a24-f882-4282-89d0-f86dc50864a9", null, "Professional", "PROFESSIONAL" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "36951a3a-f7cb-4f5c-bb43-00cce4dbb9d8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6ef75a24-f882-4282-89d0-f86dc50864a9");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "20e56afb-6c60-40f5-9b22-0958d36efd31", null, "Professional", "PROFESSIONAL" },
                    { "84619ce3-91cf-4cb8-a473-e9ec869a221b", null, "Admin", "ADMIN" }
                });
        }
    }
}
