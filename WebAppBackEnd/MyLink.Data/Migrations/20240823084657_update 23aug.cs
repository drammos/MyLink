using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MyLink.Data.Migrations
{
    /// <inheritdoc />
    public partial class update23aug : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1ba2b27c-db11-4ad7-8c95-68092f22fec0");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "42cceade-2cff-4ec9-8160-e30f0364438b");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "99708c37-b200-46d3-818e-9d8415832cd2", null, "Professional", "PROFESSIONAL" },
                    { "d7bf60f9-4c2a-429e-8b69-d9901acf144c", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "99708c37-b200-46d3-818e-9d8415832cd2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d7bf60f9-4c2a-429e-8b69-d9901acf144c");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1ba2b27c-db11-4ad7-8c95-68092f22fec0", null, "Professional", "PROFESSIONAL" },
                    { "42cceade-2cff-4ec9-8160-e30f0364438b", null, "Admin", "ADMIN" }
                });
        }
    }
}
