using AutoMapper;
using InformationManagment.Core.Command.CountryCommand;
using InformationManagment.Core.Entities;
using InformationManagment.Core.Repository.Interfaces;
using MediatR;

namespace InformationManagment.Core.Handler.CountryHandler
{
    public class AddOrUpdateCountryCommandHandler : IRequestHandler<AddOrUpdateCountryCommand, int>
    {
        private readonly IRepository<Country> _countryRepository;
        private readonly IMapper _mapper;

        public AddOrUpdateCountryCommandHandler(IRepository<Country> countryRepository, IMapper mapper)
        {
            _countryRepository = countryRepository;
            _mapper = mapper;
        }

        public async Task<int> Handle(AddOrUpdateCountryCommand request, CancellationToken cancellationToken)
        {
            ArgumentNullException.ThrowIfNull(request);

            if (string.IsNullOrEmpty(request.Name))
                throw new ArgumentException("Country name is required");

            var country = _mapper.Map<Country>(request);

            if (country.Id > 0)
                _countryRepository.Update(country);
            else
                await _countryRepository.Insert(country);

            await _countryRepository.SaveChangesAsync();

            return country.Id;
        }
    }
}
