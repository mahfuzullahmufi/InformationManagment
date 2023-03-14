using System.ComponentModel.DataAnnotations;

namespace InformationCollector.Models
{
    public class CreateInfoDTO
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string? Country { get; set; }
        public string? City { get; set; }
        //public string? Language { get; set; }
        public List<LanguageDTO>? Language { get; set; }
        public string? ResumeUrl { get; set; }
        public string? DateOfBirth { get; set; }
        //public string? FileNames { get; set; }
        //public string? FileTypes { get; set; }
        //public byte[]? FileList { get; set; }
        //public FileSaveDTO? Files { get; set; }


    }

    public class UpdateInfoDTO : CreateInfoDTO
    {

    }

    public class InformationDTO : CreateInfoDTO
    {
        public int Id { get; set; } 

    }
}
