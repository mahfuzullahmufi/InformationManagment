using AutoMapper;
using InformationManagment.Core.Entities;
using InformationManagment.Core.Models;

namespace InformationManagment.Api.Setup
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Person, PersonDto>()
                .ForMember(dest => dest.PersonLanguages, opt => opt.MapFrom(src => src.PersonLanguages.Select(pl => pl.Language)));

            CreateMap<Language, LanguageDto>()
                .ReverseMap();

            CreateMap<PersonDto, Person>()
            .ForMember(dest => dest.PersonLanguages, opt => opt.Ignore());
        }
    }
}
