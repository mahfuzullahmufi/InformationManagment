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

    }
}
