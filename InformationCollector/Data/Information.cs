using InformationCollector.Data;
using System.ComponentModel.DataAnnotations;

namespace InformationCollector.Models
{
    public class Information
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? CountryId { get; set; }
        public string? CityId { get; set; }
        public List<LanguageData>? LanguageList { get; set; }
        public string? DateOfBirth { get; set; }
        public string? FileNames { get; set; }
        public string? FileTypes { get; set; }
        public byte[]? FileBase64 { get; set; }
    }
}
