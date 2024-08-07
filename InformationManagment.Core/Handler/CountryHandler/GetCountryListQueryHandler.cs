using AutoMapper;
using InformationManagment.Core.Entities;
using InformationManagment.Core.Models;
using InformationManagment.Core.Queries.CountryQueries;
using InformationManagment.Core.Repository.Interfaces;
using MediatR;

namespace InformationManagment.Core.Handler.CountryHandler
{
    public class GetCountryListQueryHandler : IRequestHandler<GetCountryListQuery, List<CountryDto>>
    {
        private readonly IRepository<Country> _countryRepository;
        private readonly IMapper _mapper;

        public GetCountryListQueryHandler(IRepository<Country> countryRepository, IMapper mapper)
        {
            _countryRepository = countryRepository;
            _mapper = mapper;
        }

        public async Task<List<CountryDto>> Handle(GetCountryListQuery request, CancellationToken cancellationToken)
        {
            var result = await _countryRepository.GetsAsync();
            if (result is null)
                return new List<CountryDto>();

            return _mapper.Map<List<CountryDto>>(result);
        }
    }
}
