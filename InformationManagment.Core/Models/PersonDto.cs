﻿using InformationManagment.Core.Entities;

namespace InformationManagment.Core.Models
{
    public class PersonDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int CountryId { get; set; }
        public string? CountryName { get; set; }
        public int CityId { get; set; }
        public string? CityName { get; set; }
        public List<LanguageDto>? PersonLanguages { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? FileNames { get; set; }
        public string? FileTypes { get; set; }
        public byte[]? FileBase64 { get; set; }
    }
}
