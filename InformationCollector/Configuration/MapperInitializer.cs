using AutoMapper;
using InformationCollector.Data;
using InformationCollector.Models;

namespace InformationCollector.Configuration
{
    public class MapperInitializer :  Profile
    {
        public MapperInitializer()
        {
            CreateMap<Information, InformationDTO>();            
        }
    }
}
