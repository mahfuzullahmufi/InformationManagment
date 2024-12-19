using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Reflection;
using System.Text;
using InformationManagment.Core.DbContext;
using InformationManagment.Core.Utilities;
using InformationManagment.Core.Repository.Interfaces;
using InformationManagment.Core.Repository;
using InformationManagment.Core.Entities;
using InformationManagment.Api.Setup;
using InformationManagment.Core.Command.PersonCommand;
using InformationManagment.Core.Models.Auth;
using InformationManagment.Core.Handler.AuthHandler;
using Microsoft.Data.SqlClient;

namespace InformationManagment.Api.Extentions
{
    public static class ServiceRegistryExtensions
    {
        public static IServiceCollection RegisterServices(this IServiceCollection service)
        {
            service.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "InformationManagementApi", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please Bearer and then token in the field",
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement {
                   {
                     new OpenApiSecurityScheme
                     {
                       Reference = new OpenApiReference
                       {
                         Type = ReferenceType.SecurityScheme,
                         Id = "Bearer"
                       }
                      },
                      new string[] { }
                    }
                });
            });

            var dbHost = Environment.GetEnvironmentVariable("DB_HOST");
            var dbName = Environment.GetEnvironmentVariable("DB_NAME");
            var dbPassword = Environment.GetEnvironmentVariable("DB_SA_PASSWORD");
            var connectionString = $"Data Source={dbHost};Initial Catalog={dbName};User ID=sa;Password={dbPassword};TrustServerCertificate=True;";

            service
                .AddDbContext<DatabaseContext>(options =>
                {
                    options.UseSqlServer(AppSettings.Settings.SqlConnection);
                    //options.UseSqlServer(connectionString);
                })
                .AddScoped(typeof(IRepository<>), typeof(Repository<>))
                .AddScoped<IAuthService, AuthService>()
                .AddScoped<ISendGridEmailSender, SendGridEmailSender>()
                .AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(typeof(AddOrUpdatePersonCommand).GetTypeInfo().Assembly));

            //Ensure the database is created
            //using (var scope = service.BuildServiceProvider().CreateScope())
            //{
            //    var dbContext = scope.ServiceProvider.GetRequiredService<DatabaseContext>();
            //    dbContext.EnsureDatabaseCreated(dbHost, dbName, dbPassword);
            //}

            service.AddIdentity<ApplicationUser, IdentityRole>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 4;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;

                options.Tokens.AuthenticatorTokenProvider = TokenOptions.DefaultAuthenticatorProvider; // Enable authenticator tokens for 2FA
            })
           .AddEntityFrameworkStores<DatabaseContext>()
           .AddDefaultTokenProviders();

            service.Configure<DataProtectionTokenProviderOptions>(opt =>
            {
                // Set the lifespan of tokens (e.g., for password reset) to 30 minutes
                opt.TokenLifespan = TimeSpan.FromMinutes(30);
            });

            service.Configure<DataProtectionTokenProviderOptions>(opt =>
               opt.TokenLifespan = TimeSpan.FromMinutes(30));

            var key = Encoding.ASCII.GetBytes(AppSettings.Settings.SecretKey);

            service.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new()
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateAudience = true,
                    ValidateIssuer = false,
                    ValidAudience = AppSettings.Settings.AppUrl,
                    //ValidIssuer = AppSettings.Settings.ApiUrl,
                    ClockSkew = TimeSpan.Zero
                };
            });

            service.MapEntities();
            service.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            });

            return service;
        }

        public static void EnsureDatabaseCreated(this DatabaseContext dbContext, string dbHost, string dbName, string dbPassword)
        {
            // Create connection string for master database
            var masterConnectionString = $"Data Source={dbHost};Initial Catalog=master;User ID=sa;Password={dbPassword};TrustServerCertificate=True;";

            using (var connection = new SqlConnection(masterConnectionString))
            {
                connection.Open();

                // Check if the database exists
                var cmdText = $"IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = '{dbName}') CREATE DATABASE [{dbName}]";
                using (var command = new SqlCommand(cmdText, connection))
                {
                    command.ExecuteNonQuery();
                }
            }

            // Ensure EF Core migrations are applied and schema is created
            dbContext.Database.Migrate();
        }
    

    public static void AddRoles(this IServiceCollection services)
        {

            using var scope = services.BuildServiceProvider().CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<DatabaseContext>();
            if (!dbContext.Roles.Any())
            {
                dbContext.Roles.AddRange(
                  new List<IdentityRole> {
                      new()
                        {
                            Name = UserRoleType.Admin.ToString(),
                            NormalizedName = UserRoleType.Admin.ToString().ToUpper()
                        },
                      new()
                        {
                            Name = UserRoleType.User.ToString(),
                            NormalizedName = UserRoleType.User.ToString().ToUpper()
                        },
                  });

                dbContext.SaveChanges();
            }
        }
    }
}
