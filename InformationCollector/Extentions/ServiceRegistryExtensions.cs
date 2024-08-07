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

            service
                .AddDbContext<DatabaseContext>(options =>
                {
                    options.UseSqlServer(AppSettings.Settings.SqlConnection);
                })
                .AddScoped(typeof(IRepository<>), typeof(Repository<>))
                .AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(typeof(AddOrUpdatePersonCommand).GetTypeInfo().Assembly));

            service.AddIdentity<ApplicationUser, IdentityRole>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 4;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
            })
           .AddEntityFrameworkStores<DatabaseContext>()
           .AddDefaultTokenProviders();
            
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
                    ValidateIssuer = true,
                    ValidAudience = AppSettings.Settings.SalesAppUrl,
                    ValidIssuer = AppSettings.Settings.ApiUrl,
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
    }
}
