using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InformationManagment.Core.Entities
{
    public class City
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [ForeignKey(nameof(Country))]
        public int CountryId { get; set; }
        public Country Country { get; set; }
        public List<Person> Persons { get; set; }
    }
}
