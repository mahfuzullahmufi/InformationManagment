using AutoMapper;
using InformationManagment.Core.Command.CityCommand;
using InformationManagment.Core.Entities;
using InformationManagment.Core.Repository.Interfaces;
using MediatR;

namespace InformationManagment.Core.Handler.CityHandler
{
    public class AddOrUpdateCityCommandHandler : IRequestHandler<AddOrUpdateCityCommand, int>
    {
        private readonly IRepository<City> _cityRepository;
        private readonly IMapper _mapper;

        public AddOrUpdateCityCommandHandler(IRepository<City> cityRepository, IMapper mapper)
        {
            _cityRepository = cityRepository;
            _mapper = mapper;
        }

        public async Task<int> Handle(AddOrUpdateCityCommand request, CancellationToken cancellationToken)
        {
            ArgumentNullException.ThrowIfNull(request);

            if (string.IsNullOrEmpty(request.Name))
                throw new ArgumentException("City name is required");

            var city = _mapper.Map<City>(request);

            if (city.Id > 0)
                _cityRepository.Update(city);
            else
                await _cityRepository.Insert(city);

            await _cityRepository.SaveChangesAsync();

            return city.Id;
        }
    }
}
