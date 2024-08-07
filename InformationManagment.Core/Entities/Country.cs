using System.ComponentModel.DataAnnotations;

namespace InformationManagment.Core.Entities
{
    public class Country
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public List<City> Cities { get; set; }
        public List<Person> Persons { get; set; }
    }
}
