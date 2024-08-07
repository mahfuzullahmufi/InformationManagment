namespace InformationManagment.Core.Models
{
    public class PersonSaveDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int CountryId { get; set; }
        public int CityId { get; set; }
        public List<LanguageDto>? PersonLanguages { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? FileNames { get; set; }
        public string? FileTypes { get; set; }
        public byte[]? FileBase64 { get; set; }
    }
}
