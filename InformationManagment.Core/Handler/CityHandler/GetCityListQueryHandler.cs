using AutoMapper;
using InformationManagment.Core.Entities;
using InformationManagment.Core.Models;
using InformationManagment.Core.Queries.CityQueries;
using InformationManagment.Core.Repository.Interfaces;
using MediatR;

namespace InformationManagment.Core.Handler.CityHandler
{
    public class GetCityListQueryHandler : IRequestHandler<GetCityListQuery, List<CityDto>>
    {
        private readonly IRepository<City> _cityRepository;
        private readonly IMapper _mapper;

        public GetCityListQueryHandler(IRepository<City> cityRepository, IMapper mapper)
        {
            _cityRepository = cityRepository;
            _mapper = mapper;
        }

        public async Task<List<CityDto>> Handle(GetCityListQuery request, CancellationToken cancellationToken)
        {
            var result = await _cityRepository.GetsAsync();
            if (result is null)
                return new List<CityDto>();

            return _mapper.Map<List<CityDto>>(result);
        }
    }
}
