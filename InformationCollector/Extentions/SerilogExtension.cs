using Serilog;

namespace InformationManagment.Api.Extentions
{
    public static class SerilogExtension
    {
        public static IHostBuilder UseSerilog(this IHostBuilder builder, IConfiguration configuration)
        {
            Log.Logger = new LoggerConfiguration().ReadFrom.Configuration(configuration).CreateLogger();
            builder.UseSerilog();
            return builder;
        }
    }
}
