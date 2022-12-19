using AutoMapper;
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
