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

        }

        public DbSet<Person> Persons { get; set; }
        public DbSet<Country> Countrys { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<PersonLanguage> PersonLanguages { get; set; }
    }
}
