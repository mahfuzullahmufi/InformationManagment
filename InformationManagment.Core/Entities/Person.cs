using System.ComponentModel.DataAnnotations;

namespace InformationManagment.Core.Entities
{
    public class Person
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public int? CountryId { get; set; }
        public int? CityId { get; set; }
        public List<PersonLanguage> PersonLanguages { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? FileNames { get; set; }
        public string? FileTypes { get; set; }
        public byte[]? FileBase64 { get; set; }
    }
}
