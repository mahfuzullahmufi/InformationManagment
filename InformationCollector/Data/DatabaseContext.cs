using InformationCollector.Models;
using Microsoft.EntityFrameworkCore;

namespace InformationCollector.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Information> Informations { get; set; }
        public DbSet<Country> Countrys { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<LanguageData> LanguageData { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Country>().HasData(
                new Country
                {
                    Id = 1,
                    CountryName = "Bangladesh",

                },
                new Country
                {
                    Id = 2,
                    CountryName = "Saudi Arabia"
                },
                new Country
                {
                    Id = 3,
                    CountryName = "India"
                }
                );
            builder.Entity<City>().HasData(
                new City
                {
                    Id = 1,
                    CityName = "Dhaka",
                    CountryID = 1,

                },
                new City
                {
                    Id = 2,
                    CityName = "Mymensingh",
                    CountryID = 1
                },
                new City
                {
                    Id = 3,
                    CityName = "Sylhet",
                    CountryID = 1
                },
                new City
                {
                    Id = 4,
                    CityName = "Jeddah",
                    CountryID = 2
                },
                new City
                {
                    Id = 5,
                    CityName = "Mumbai",
                    CountryID = 3
                },
                new City
                {
                    Id = 6,
                    CityName = "Dilhi",
                    CountryID = 3
                }
                );

            builder.Entity<Language>().HasData(
                new Language
                {
                    Id = 1,
                    LanguageName = "C#",

                },
                new Language
                {
                    Id = 2,
                    LanguageName = "Angualar"
                },
                new Language
                {
                    Id = 3,
                    LanguageName = "TypeScript"
                },
                new Language
                {
                    Id = 4,
                    LanguageName = "JavaScript",

                },
                new Language
                {
                    Id = 5,
                    LanguageName = "C"
                },
                new Language
                {
                    Id = 6,
                    LanguageName = "Java"
                }
                );
        }
    }
}
