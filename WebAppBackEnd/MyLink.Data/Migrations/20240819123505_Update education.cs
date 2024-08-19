using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MyLink.Data.Migrations
{
    /// <inheritdoc />
    public partial class Updateeducation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                    { "15660d34-ed09-4acc-af8c-0d78df8eace8", null, "Admin", "ADMIN" },
                    { "1f08691d-1474-4e8d-9fff-cf52fa7ff51e", null, "Professional", "PROFESSIONAL" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "15660d34-ed09-4acc-af8c-0d78df8eace8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1f08691d-1474-4e8d-9fff-cf52fa7ff51e");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "61c67059-882b-4ead-b434-530ea73c2be6", null, "Professional", "PROFESSIONAL" },
                    { "7616b115-f71b-4578-b33f-002350a8e238", null, "Admin", "ADMIN" }
                });
        }
    }
}
