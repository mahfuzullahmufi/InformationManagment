using System.ComponentModel.DataAnnotations;

namespace InformationCollector.Models
{
    public class Information
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? CountryId { get; set; }
        public string? CityId { get; set; }
        public List<LanguageDTO>? LanguageList { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public FileSaveDTO? Document { get; set; }
        //public byte[]? File { get; set; }
        //public string? FileTypes { get; set; }
        //public string? FileNames { get; set; }
    }
}
