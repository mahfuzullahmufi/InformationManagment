using System.ComponentModel.DataAnnotations;

namespace InformationCollector.Models
{
    public class Information
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        public string? CountryId { get; set; }
        public string? CityId { get; set; }
        public List<LanguageDTO>? Language { get; set; }
        [Required]
        public DateTime? DateOfBirth { get; set; }
        //public FileSaveDTO? Files { get; set; }
        public byte[]? File { get; set; }
        public string? FileTypes { get; set; }
        public string? FileNames { get; set; }
    }
}
