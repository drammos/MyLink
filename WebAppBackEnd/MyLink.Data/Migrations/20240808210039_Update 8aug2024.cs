using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MyLink.Data.Migrations
{
    /// <inheritdoc />
    public partial class Update8aug2024 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                    { "00fe3ed9-dfe4-46e6-acfc-df1532f1a088", null, "Professional", "PROFESSIONAL" },
                    { "c06df549-854d-407c-921c-a6648e5737f9", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "00fe3ed9-dfe4-46e6-acfc-df1532f1a088");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c06df549-854d-407c-921c-a6648e5737f9");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "36951a3a-f7cb-4f5c-bb43-00cce4dbb9d8", null, "Admin", "ADMIN" },
                    { "6ef75a24-f882-4282-89d0-f86dc50864a9", null, "Professional", "PROFESSIONAL" }
                });
        }
    }
}
