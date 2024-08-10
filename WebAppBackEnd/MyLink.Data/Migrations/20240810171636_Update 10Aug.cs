using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MyLink.Data.Migrations
{
    /// <inheritdoc />
    public partial class Update10Aug : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "00fe3ed9-dfe4-46e6-acfc-df1532f1a088");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c06df549-854d-407c-921c-a6648e5737f9");

            migrationBuilder.DropColumn(
                name: "IsAdmin",
                table: "AspNetUsers");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2479bd23-e17b-46fe-a87b-d87c2225b608", null, "Admin", "ADMIN" },
                    { "b0a06342-5f79-460f-8877-7448c8797971", null, "Professional", "PROFESSIONAL" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2479bd23-e17b-46fe-a87b-d87c2225b608");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b0a06342-5f79-460f-8877-7448c8797971");

            migrationBuilder.AddColumn<bool>(
                name: "IsAdmin",
                table: "AspNetUsers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "00fe3ed9-dfe4-46e6-acfc-df1532f1a088", null, "Professional", "PROFESSIONAL" },
                    { "c06df549-854d-407c-921c-a6648e5737f9", null, "Admin", "ADMIN" }
                });
        }
    }
}
