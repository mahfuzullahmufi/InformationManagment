using InformationCollector.Data;
using System.ComponentModel.DataAnnotations;

namespace InformationCollector.Models
{
    public class CreateInfoDTO
    {
        public string? Name { get; set; }
        public string? CountryId { get; set; }
        public string? CityId { get; set; }
        public List<LanguageDTO>? LanguageList { get; set; }
        public string? DateOfBirth { get; set; }
        public FileSaveDTO? Document { get; set; }
    }

    public class UpdateInfoDTO : CreateInfoDTO
    {

    }

    public class InformationDTO : CreateInfoDTO
    {
        public int Id { get; set; }
        public string? CountryName { get; set; }
        public string? CityName { get; set; }
        public byte[]? FileBase64 { get; set; }
        public string? FileTypes { get; set; }
        public string? FileNames { get; set; }
        public string? Languages { get; set; }


    }
}
