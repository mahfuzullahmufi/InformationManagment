using System.ComponentModel.DataAnnotations.Schema;

namespace InformationCollector.Data
{
    public class City
    {
        public int Id { get; set; }
        public string CityName { get; set; }
        [ForeignKey(nameof(Country))]
        public int CountryID { get; set; }
    }
}
