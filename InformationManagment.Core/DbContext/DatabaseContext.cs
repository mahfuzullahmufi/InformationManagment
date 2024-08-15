using InformationManagment.Core.Entities;
using InformationManagment.Core.Helper;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace InformationManagment.Core.DbContext
{
    public class DatabaseContext : IdentityDbContext<ApplicationUser>
    {
        public DatabaseContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            SeedData.SeedInitData(builder);
            base.OnModelCreating(builder);

            builder.Entity<PersonLanguage>()
                .HasKey(pl => new { pl.PersonId, pl.LanguageId });

            builder.Entity<PersonLanguage>()
                .HasOne(pl => pl.Person)
                .WithMany(p => p.PersonLanguages)
                .HasForeignKey(pl => pl.PersonId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<PersonLanguage>()
                .HasOne(pl => pl.Language)
                .WithMany(l => l.PersonLanguages)
                .HasForeignKey(pl => pl.LanguageId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Country>()
                .HasMany(c => c.Cities)
                .WithOne(c => c.Country)
                .HasForeignKey(c => c.CountryId);

            // Configuring the one-to-many relationship between Country and City
            builder.Entity<Country>()
                .HasMany(c => c.Cities)
                .WithOne(c => c.Country)
                .HasForeignKey(c => c.CountryId)
                .OnDelete(DeleteBehavior.Restrict); // No cascade delete

            // Configuring the one-to-many relationship between Country and Person
            builder.Entity<Country>()
                .HasMany(c => c.Persons)
                .WithOne(p => p.Country)
                .HasForeignKey(p => p.CountryId)
                .OnDelete(DeleteBehavior.Restrict); // No cascade delete

            // Configuring the one-to-many relationship between City and Person
            builder.Entity<City>()
                .HasMany(c => c.Persons)
                .WithOne(p => p.City)
                .HasForeignKey(p => p.CityId)
                .OnDelete(DeleteBehavior.Restrict); // No cascade delete

            builder.Entity<MenuRole>()
                   .HasKey(mr => new { mr.MenuId, mr.RoleId });

            builder.Entity<MenuRole>()
                .HasOne(mr => mr.Menu)
                .WithMany(m => m.MenuRoles)
                .HasForeignKey(mr => mr.MenuId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<MenuRole>()
                .HasOne(mr => mr.Role)
                .WithMany()
                .HasForeignKey(mr => mr.RoleId)
                .OnDelete(DeleteBehavior.Restrict);
        }

        public DbSet<Person> Persons { get; set; }
        public DbSet<Country> Countrys { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<PersonLanguage> PersonLanguages { get; set; }
        public DbSet<Menu> Menus { get; set; }
        public DbSet<MenuRole> MenuRoles { get; set; }
    }
}
