namespace InformationCollector.Models
{
    public class FileSaveDTO
    {
        public int? Id { get; set; }

        public byte[]? FileBase64 { get; set; }
        public string? FileTypes { get; set; }
        public string? FileNames { get; set; }
    }
}
