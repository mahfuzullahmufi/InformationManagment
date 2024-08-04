namespace InformationManagment.Core.Utilities
{
    public static class AppSettings
    {
        public static Settings Settings { get; set; } = new();
    }

    public class Settings
    {
        public string SqlConnection { get; set; }
        public string SecretKey { get; set; }
        public string ApiUrl { get; set; }
        public string SalesAppUrl { get; set; }
        public string CustomerAppUrl { get; set; }
    }
}
