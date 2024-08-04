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
                    Name = "Bangladesh",
                },
                new Country
                {
                    Id = 2,
                    Name = "Saudi Arabia"
                },
                new Country
                {
                    Id = 3,
                    Name = "India"
                }
            );
        }

        private static void SeedCity(ModelBuilder builder)
        {
            builder.Entity<City>().HasData(
                new City
                {
                    Id = 1,
                    Name = "Dhaka",
                    CountryId = 1,
                },
                new City
                {
                    Id = 2,
                    Name = "Mymensingh",
                    CountryId = 1
                },
                new City
                {
                    Id = 3,
                    Name = "Sylhet",
                    CountryId = 1
                },
                new City
                {
                    Id = 4,
                    Name = "Jeddah",
                    CountryId = 2
                },
                new City
                {
                    Id = 5,
                    Name = "Mumbai",
                    CountryId = 3
                },
                new City
                {
                    Id = 6,
                    Name = "Delhi",
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
                    Name = "C#",
                },
                new Language
                {
                    Id = 2,
                    Name = "Angular"
                },
                new Language
                {
                    Id = 3,
                    Name = "TypeScript"
                },
                new Language
                {
                    Id = 4,
                    Name = "JavaScript",
                },
                new Language
                {
                    Id = 5,
                    Name = "C"
                },
                new Language
                {
                    Id = 6,
                    Name = "Java"
                }
            );
        }
    }
}
