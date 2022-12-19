using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InformationCollector.Migrations
{
    public partial class InitialDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CityName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CountryID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Countrys",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CountryName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Countrys", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Informations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Language = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ResumeUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfBirth = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Informations", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Cities",
                columns: new[] { "Id", "CityName", "CountryID" },
                values: new object[,]
                {
                    { 1, "Dhaka", 1 },
                    { 2, "Mymensingh", 1 },
                    { 3, "Sylhet", 1 },
                    { 4, "Jeddah", 2 },
                    { 5, "Mumbai", 3 },
                    { 6, "Dilhi", 3 }
                });

            migrationBuilder.InsertData(
                table: "Countrys",
                columns: new[] { "Id", "CountryName" },
                values: new object[,]
                {
                    { 1, "Bangladesh" },
                    { 2, "Saudi Arabia" },
                    { 3, "India" }
                });

            migrationBuilder.InsertData(
                table: "Informations",
                columns: new[] { "Id", "City", "Country", "DateOfBirth", "Language", "Name", "ResumeUrl" },
                values: new object[,]
                {
                    { 1, "Dhaka", "BD", "2000-11-01", "C#, Javascipt, HTML, CSS", "Md. Mahfuzullah", "resume/Resume of Mahfuzullah.pdf" },
                    { 2, "Jessure", "JS", "1999-03-26", "C#, Javascipt, HTML, CSS", "Asif", "resume/Asif Hasan Resume.pdf" },
                    { 3, "Dhaka", "BD", "2000-11-01", "C#, Javascipt, HTML, CSS", "Md. Mahfuzullah", "resume/Resume of Mahfuzullah.pdf" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cities");

            migrationBuilder.DropTable(
                name: "Countrys");

            migrationBuilder.DropTable(
                name: "Informations");
        }
    }
}
