using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InformationManagment.Core.Migrations
{
    /// <inheritdoc />
    public partial class MenuTableAddedIsActive : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Menus",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Menus");
        }
    }
}
