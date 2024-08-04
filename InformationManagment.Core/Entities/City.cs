﻿using System.ComponentModel.DataAnnotations.Schema;

namespace InformationManagment.Core.Entities
{
    public class City
    {
        public int Id { get; set; }
        public string? CityName { get; set; }
        [ForeignKey(nameof(Country))]
        public int CountryId { get; set; }
        public Country Country { get; set; }
    }
}
