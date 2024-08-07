using InformationManagment.Core.Command.CityCommand;
using InformationManagment.Core.Entities;
using InformationManagment.Core.Repository.Interfaces;
using MediatR;

namespace InformationManagment.Core.Handler.CityHandler
{
    public class DeleteCityCommandHandler : IRequestHandler<DeleteCityCommand, bool>
    {
        private readonly IRepository<City> _cityRepository;

        public DeleteCityCommandHandler(IRepository<City> cityRepository)
        {
            _cityRepository = cityRepository;
        }

        public async Task<bool> Handle(DeleteCityCommand request, CancellationToken cancellationToken)
        {
            var city = await _cityRepository.GetByIdAsync(request.Id);
            if (city == null)
                return false;

            await _cityRepository.Delete(request.Id);
            await _cityRepository.SaveChangesAsync();

            return true;
        }
    }
}
