using InformationManagment.Api.Extentions;
using InformationManagment.Core.Utilities;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Host.UseSerilog(builder.Configuration);
builder.Services.AddEndpointsApiExplorer();

builder.Configuration.GetSection("Settings").Bind(AppSettings.Settings);

builder.Services.RegisterServices();
builder.Services.AddRoles();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseSerilogRequestLogging();

app.UseHttpsRedirection();
app.UseCors("CorsPolicy");
app.UseMiddleware<ExceptionMiddleware>();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
