using AutoMapper;
using InformationManagment.Core.Entities;
using InformationManagment.Core.Models;
using InformationManagment.Core.Queries.CountryQueries;
using InformationManagment.Core.Repository.Interfaces;
using MediatR;

namespace InformationManagment.Core.Handler.CountryHandler
{
    public class GetCountryByIdQueryHandler : IRequestHandler<GetCountryByIdQuery, CountryDto>
    {
        private readonly IRepository<Country> _countryRepository;
        private readonly IMapper _mapper;

        public GetCountryByIdQueryHandler(IRepository<Country> countryRepository, IMapper mapper)
        {
            _countryRepository = countryRepository;
            _mapper = mapper;
        }

        public async Task<CountryDto> Handle(GetCountryByIdQuery request, CancellationToken cancellationToken)
        {
            var country = await _countryRepository.FirstOrDefaultAsync(x => x.Id == request.Id);
            if (country is null)
                return new CountryDto();

            return _mapper.Map<CountryDto>(country);
        }
    }
}
