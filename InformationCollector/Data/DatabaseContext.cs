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

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Information>().HasData(
                new Information
                {
                    Id = 1,
                    Name = "Md. Mahfuzullah",
                    Country = "BD",
                    City = "Dhaka",
                    Language = "C#, Javascipt, HTML, CSS",
                    ResumeUrl = "resume/Resume of Mahfuzullah.pdf",
                    DateOfBirth = "2000-11-01"
                },
                new Information
                {
                    Id = 2,
                    Name = "Asif",
                    Country = "JS",
                    City = "Jessure",
                    Language = "C#, Javascipt, HTML, CSS",
                    ResumeUrl = "resume/Asif Hasan Resume.pdf",
                    DateOfBirth = "1999-03-26"
                },
                new Information
                {
                    Id = 3,
                    Name = "Md. Mahfuzullah",
                    Country = "BD",
                    City = "Dhaka",
                    Language = "C#, Javascipt, HTML, CSS",
                    ResumeUrl = "resume/Resume of Mahfuzullah.pdf",
                    DateOfBirth = "2000-11-01"
                }
                );
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
        }
    }
}
