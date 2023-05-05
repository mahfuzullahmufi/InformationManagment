using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace InformationCollector.Models
{
    [Keyless]
    [NotMapped]
    public class FileSaveDTO
    {
        public byte[]? FileBase64 { get; set; }
        public string? FileTypes { get; set; }
        public string? FileNames { get; set; }
    }
}
