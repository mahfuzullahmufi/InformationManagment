﻿using AutoMapper;
using InformationManagment.Core.Entities;
using InformationManagment.Core.Models;

namespace InformationManagment.Api.Setup
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Map Person to PersonDto
            CreateMap<Person, PersonDto>()
                .ForMember(dest => dest.PersonLanguages, opt => opt.MapFrom(src => src.PersonLanguages.Select(pl => pl.Language)))
                .ReverseMap()
                .ForMember(dest => dest.PersonLanguages, opt => opt.MapFrom(src => src.PersonLanguages.Select(ldto => new PersonLanguage { LanguageId = ldto.Id.Value, PersonId = src.Id })));

            // Map Language to LanguageDto and reverse
            CreateMap<Language, LanguageDto>().ReverseMap();

            // Map PersonLanguage to LanguageDto
            CreateMap<PersonLanguage, LanguageDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.LanguageId))
                .ForMember(dest => dest.LanguageName, opt => opt.MapFrom(src => src.Language.Name))
                .ReverseMap()
                .ForMember(dest => dest.LanguageId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Language, opt => opt.Ignore());
        }
    }
}
