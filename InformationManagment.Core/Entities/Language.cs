using System.ComponentModel.DataAnnotations.Schema;

namespace InformationManagment.Core.Entities
{
    public class Language
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<PersonLanguage> PersonLanguages { get; set; }
    }
}
