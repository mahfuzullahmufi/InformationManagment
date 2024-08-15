using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InformationManagment.Core.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedMenuTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MenuRole_AspNetRoles_RoleId",
                table: "MenuRole");

            migrationBuilder.DropForeignKey(
                name: "FK_MenuRole_Menu_MenuId",
                table: "MenuRole");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MenuRole",
                table: "MenuRole");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Menu",
                table: "Menu");

            migrationBuilder.RenameTable(
                name: "MenuRole",
                newName: "MenuRoles");

            migrationBuilder.RenameTable(
                name: "Menu",
                newName: "Menus");

            migrationBuilder.RenameIndex(
                name: "IX_MenuRole_RoleId",
                table: "MenuRoles",
                newName: "IX_MenuRoles_RoleId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MenuRoles",
                table: "MenuRoles",
                columns: new[] { "MenuId", "RoleId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Menus",
                table: "Menus",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MenuRoles_AspNetRoles_RoleId",
                table: "MenuRoles",
                column: "RoleId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MenuRoles_Menus_MenuId",
                table: "MenuRoles",
                column: "MenuId",
                principalTable: "Menus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MenuRoles_AspNetRoles_RoleId",
                table: "MenuRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_MenuRoles_Menus_MenuId",
                table: "MenuRoles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Menus",
                table: "Menus");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MenuRoles",
                table: "MenuRoles");

            migrationBuilder.RenameTable(
                name: "Menus",
                newName: "Menu");

            migrationBuilder.RenameTable(
                name: "MenuRoles",
                newName: "MenuRole");

            migrationBuilder.RenameIndex(
                name: "IX_MenuRoles_RoleId",
                table: "MenuRole",
                newName: "IX_MenuRole_RoleId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Menu",
                table: "Menu",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MenuRole",
                table: "MenuRole",
                columns: new[] { "MenuId", "RoleId" });

            migrationBuilder.AddForeignKey(
                name: "FK_MenuRole_AspNetRoles_RoleId",
                table: "MenuRole",
                column: "RoleId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MenuRole_Menu_MenuId",
                table: "MenuRole",
                column: "MenuId",
                principalTable: "Menu",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
