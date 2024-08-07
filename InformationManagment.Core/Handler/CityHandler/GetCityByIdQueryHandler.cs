using AutoMapper;
using InformationManagment.Core.Entities;
using InformationManagment.Core.Models;
using InformationManagment.Core.Queries.CityQueries;
using InformationManagment.Core.Repository.Interfaces;
using MediatR;

namespace InformationManagment.Core.Handler.CityHandler
{
    public class GetCityByIdQueryHandler : IRequestHandler<GetCityByIdQuery, CityDto>
    {
        private readonly IRepository<City> _cityRepository;
        private readonly IMapper _mapper;

        public GetCityByIdQueryHandler(IRepository<City> cityRepository, IMapper mapper)
        {
            _cityRepository = cityRepository;
            _mapper = mapper;
        }

        public async Task<CityDto> Handle(GetCityByIdQuery request, CancellationToken cancellationToken)
        {
            var city = await _cityRepository.FirstOrDefaultAsync(x => x.Id == request.Id);
            if (city is null)
                return new CityDto();

            return _mapper.Map<CityDto>(city);
        }
    }
}
