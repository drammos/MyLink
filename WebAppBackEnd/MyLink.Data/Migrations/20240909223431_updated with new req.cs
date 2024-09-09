using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MyLink.Data.Migrations
{
    /// <inheritdoc />
    public partial class updatedwithnewreq : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "10996b69-05a0-4945-a3f8-e41db1082218");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fc06f0ba-1d3c-4e13-817e-47f2b9bcd25e");

            migrationBuilder.AddColumn<string>(
                name: "CoverLetterURL",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WebPage",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0a5b12c3-457c-4021-9462-53320297b77e", null, "Admin", "ADMIN" },
                    { "c19e098b-a5e0-416b-bbcb-e989ff59ecbb", null, "Professional", "PROFESSIONAL" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0a5b12c3-457c-4021-9462-53320297b77e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c19e098b-a5e0-416b-bbcb-e989ff59ecbb");

            migrationBuilder.DropColumn(
                name: "CoverLetterURL",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "WebPage",
                table: "AspNetUsers");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "10996b69-05a0-4945-a3f8-e41db1082218", null, "Professional", "PROFESSIONAL" },
                    { "fc06f0ba-1d3c-4e13-817e-47f2b9bcd25e", null, "Admin", "ADMIN" }
                });
        }
    }
}
