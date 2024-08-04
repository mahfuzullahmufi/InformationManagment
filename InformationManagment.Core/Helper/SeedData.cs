using InformationManagment.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace InformationManagment.Core.Helper
{
    public static class SeedData
    {
        public static void SeedInitData(ModelBuilder builder)
        {
            SeedCountry(builder);
            SeedCity(builder);
            SeedLanguage(builder);
        }

        private static void SeedCountry(ModelBuilder builder)
        {
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
        }

        private static void SeedCity(ModelBuilder builder)
        {
            builder.Entity<City>().HasData(
                new City
                {
                    Id = 1,
                    CityName = "Dhaka",
                    CountryId = 1,
                },
                new City
                {
                    Id = 2,
                    CityName = "Mymensingh",
                    CountryId = 1
                },
                new City
                {
                    Id = 3,
                    CityName = "Sylhet",
                    CountryId = 1
                },
                new City
                {
                    Id = 4,
                    CityName = "Jeddah",
                    CountryId = 2
                },
                new City
                {
                    Id = 5,
                    CityName = "Mumbai",
                    CountryId = 3
                },
                new City
                {
                    Id = 6,
                    CityName = "Delhi",
                    CountryId = 3
                }
            );
        }

        private static void SeedLanguage(ModelBuilder builder)
        {
            builder.Entity<Language>().HasData(
                new Language
                {
                    Id = 1,
                    LanguageName = "C#",
                },
                new Language
                {
                    Id = 2,
                    LanguageName = "Angular"
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
